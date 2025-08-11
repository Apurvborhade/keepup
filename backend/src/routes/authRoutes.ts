import express, { NextFunction, Request, Response } from 'express'
import prisma from '../prisma';
import { generateOtp, generateToken, hashPassword, isValidPassword } from '../utils/auth';
import { sendEmail } from '../utils/sendMail';
const router = express.Router();

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
        await sendEmail({
            message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
            subject: 'Your Otp',
            to: email
        })

        res.json({ message: "OTP sent to your email" });
    } catch (error) {
        next(error)
    }
})



router.post('/verify-otp', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, otp } = req.body

        // Find the latest OTP for the given email and otp
        const existingOtp = await prisma.otp.findFirst({
            where: {
                email: email,
                otp: otp
            },
            orderBy: {
                // If you had a createdAt field, you could order by it. Since schema doesn't, just findFirst.
            }
        });

        if (existingOtp) {
            // Delete the OTP after verification
            await prisma.otp.delete({
                where: {
                    otp: existingOtp.otp
                }
            });
        } else {
            throw new AppError("Invalid Otp", 404)
        }


        const hashedPassword = hashPassword(password)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username
            }
        })
        // Generate JWT token
        const token = generateToken(user.id, user.username, user.email || undefined);

        res.cookie('token', token, {
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
            }
        })

        if (!user) {
            throw new AppError("User does not exist", 404)
        }
        const validPassword = isValidPassword(password, user?.password)

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
            message: 'Authentication successful'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Authentication failed',
            code: 'AUTH_ERROR',
        });
    }
})

export default router;