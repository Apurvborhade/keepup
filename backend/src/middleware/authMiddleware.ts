import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';
const JWTSECRET = process.env.jwtSecret as string;

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                username: string;
                email?: string;
            };
        }
    }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token

        if (!token) {
            throw new AppError("Access denied. No token provided.", 401)
        }
        const decoded = jwt.verify(token, JWTSECRET) as JwtPayload

        if (!decoded.userId) {
            throw new AppError('Invalid token payload.', 401)
        }

        // Check if user still exists in database
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                username: true,
                email: true,
            },
        });

        if (!user) {
            res.status(401).json({
                error: 'User not found.',
                code: 'USER_NOT_FOUND',
            });
            return;
        }

        // Attach user to request
        req.user = {
            id: user.id,
            username: user.username,
            email: user.email || undefined,
        };
        next()
    } catch (error) {
        next(error)
    }
}