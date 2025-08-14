import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express';
import AppError from './AppError';
import prisma from '../prisma';
const JWTSECRET = process.env.jwtSecret as string;

export const generateToken = (
    userId: string,
    username: string,
    email?: string,
    expiresIn: string | number = '7d'
) => {
    const payload: Omit<JwtPayload, 'iat' | 'exp'> = {
        userId,
        username,
        email,
    };
    return jwt.sign(payload, JWTSECRET, { expiresIn } as SignOptions)
}


export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    console.log("hash:", hash)
    return hash
}

export const isValidPassword = async (plainPassword: string, hashedPassword: string) => {
    const isValid = await bcrypt.compare(plainPassword,hashedPassword)
    return isValid
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new AppError("Access Denied", 401)
            return;
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.jwtSecret as string) as JwtPayload;

        if (!decoded.userId) {
            throw new AppError("Invalid Token Error", 401)

        }

        // Check if user still exists in database
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: {
                Monitor: true
            },
        });

        if (!user) {
            throw new AppError("User not found", 404)

        }

        // Attach user to request
        req.user = {
            id: user.id,
            username: user.username,
            email: user.email,
        };

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new AppError("Invalid token", 401)
            return;
        }

        if (error instanceof jwt.TokenExpiredError) {
            throw new AppError("Token Expired", 401)
        }


        res.status(500).json({
            error: 'Authentication failed.',
            code: 'AUTH_ERROR',
        });
    }
}
export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
}