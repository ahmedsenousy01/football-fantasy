import { Request, Response, NextFunction } from "express";
import HttpException from "@/utils/http.exception";
function catchAsyncError(fn: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((err: any) => {
            next(new HttpException(err.message));
        });
    };
}

export default catchAsyncError;
