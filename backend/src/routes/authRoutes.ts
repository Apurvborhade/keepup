import express, { NextFunction, Request, Response } from 'express'
import prisma from '../prisma';
import { authenticateToken, generateOtp, generateToken, hashPassword, isValidPassword } from '../utils/auth';
import { sendEmail } from '../utils/sendMail';
const router = express.Router();
import AppError from '../utils/AppError'


declare global {
    namespace Express {
        export interface Request {
            user?: {
                id: string;
                username: string;
                email?: string;
            }
        }
    }
}
// Register Init
router.post('/register-init', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            throw new AppError("Enter All Details", 404)
        }

        const exisitingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        })

        if (exisitingUser) {
            throw new AppError("User Already Exists", 400)
        }

        const otp = generateOtp()
        await prisma.otp.create({
            data: {
                email: email,
                otp
            }
        })
        console.log(otp)
        const mailSendRes = await sendEmail({
            message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
            subject: 'Your Otp',
            to: email
        })
        console.log("Mail: ", mailSendRes)
        res.json({ message: "OTP sent to your email" });
    } catch (error) {
        next(error)
    }
})



router.post('/verify-otp', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, otp } = req.body
        console.log("Raw Password: ", password)
        if (!username || !email || !password || !otp) {
            throw new AppError("Please Provide all details", 400)
        }
        // Find the latest OTP for the given email and otp
        const existingOtp = await prisma.otp.findFirst({
            where: {
                AND: [
                    { email: email },
                    { otp: parseInt(otp) }
                ]
            },
            orderBy: {
                // If you had a createdAt field, you could order by it. Since schema doesn't, just findFirst.
            }
        });
        if (!existingOtp) {
            throw new AppError("Incorrect Otp", 400)
        }
        if (existingOtp) {
            // Delete the OTP after verification
            await prisma.otp.deleteMany({
                where: {
                    otp: existingOtp.otp
                }
            });
        } else {
            throw new AppError("Invalid Otp", 404)
        }


        const hashedPassword = await hashPassword(password)
        console.log("Hashed Password: ", hashedPassword)
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username
            },
            include: {
                Monitor: true
            }
        })
        // Generate JWT token
        const token = generateToken(user.id, user.username, user.email || undefined);
        req.user = user
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            path: '/',
            sameSite: 'none',
            maxAge: 3600000,
        }).json({
            message: 'Authentication successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                monitors: user.Monitor
            }
        });

    } catch (error) {
        next(error)
    }
})

router.post('/logout', (req: Request, res: Response) => {
    // Clear the token cookie
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'none'
    });

    res.json({
        message: 'Logged out successfully'
    });
});
// Login User
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw new AppError("Enter All Details", 404)
        }


        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            include: {
                Monitor: true
            }
        })

        if (!user) {
            throw new AppError("User does not exist", 404)
        }
        const validPassword = await isValidPassword(password, user?.password)

        if (!validPassword) {
            throw new AppError("Invalid Password", 400)
        }
        // Generate JWT token
        const token = generateToken(user.id, user.username, user.email || undefined);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            path: '/',
            sameSite: 'none',
            maxAge: 3600000,
        }).json({
            message: 'Authentication successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                monitors: user.Monitor
            }
        });
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/auth/me
 * Get current user profile
 */
router.get('/me', authenticateToken, async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.user?.id;
        console.log(req.user)
        if (!userId) {
            res.status(401).json({
                error: 'User not authenticated',
                code: 'NO_USER_ID',
            });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                Monitor: true
            }
        });

        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                code: 'USER_NOT_FOUND',
            });
        }

        res.json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                monitors: user.Monitor,
            }
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch user profile',
            code: 'PROFILE_ERROR',
        });
    }
});

router.post('/refresh-token', (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.user) {
            throw new AppError("User not Authenticated", 401)
        }

        const newToken = generateToken(req.user.id, req.user.username, req.user.email);
        res.cookie('token', newToken, {
            httpOnly: true,
            secure: true,
            path: '/',
            sameSite: 'none',
            maxAge: 3600000,
        }).json({
            message: 'Authentication successful'
        });
    } catch (error) {
        next(error)
    }
})

export default router;