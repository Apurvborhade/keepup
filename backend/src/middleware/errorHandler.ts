import { NextFunction, Request, Response } from "express";

export interface ResponseError extends Error {
    statusCode?: number
}

const NODE_ENV = process.env.NODE_ENV;

export default function errorHandler(err: ResponseError, req: Request, res: Response, next: NextFunction) {
    console.error("Error:", err.message);
    if (NODE_ENV === 'development') console.error("Stack: ", err.stack)

    res.status(err.statusCode || 500).json({
        status: err.statusCode,
        message: err.message || "Internal Server Error",
    });
}