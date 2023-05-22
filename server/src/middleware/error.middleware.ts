import { Request, Response, NextFunction } from "express";
import HttpException from "@/utils/http.exception";

function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";

    res.status(status).json({ message });
}

export default errorMiddleware;
