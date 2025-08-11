import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
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


export const hashPassword = (password: string) => {
    let generatedHash = '';
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            generatedHash = hash
        })
    })
    return generatedHash
}

export const isValidPassword = (plainPassword: string, hashedPassword: string) => {
    return bcrypt.compare(hashedPassword, hashedPassword);
}


export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
}