import UserService from '@/services/user.service';
import JWTService from "@/services/jwt.service";
import { Request, Response, NextFunction } from "express";

/**
 * jwtTokenRequiringMiddleware
 * This Middleware will manage the JWT tokens used for authentication by fetching the header
 * then trying to parse the token
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {*}  {(Promise<Response<any, Record<string, any>> | undefined>)}
 */
export async function jwtTokenRequiringMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | undefined> {
    if (!req.headers.authorization)
        return res
            .status(403)
            .json({ message: "Token Is Required for authentication" });
    try {
        const token = JWTService.VerifyToken(
            req.headers.authorization.replace("Bearer ", "")
        );
        if (!token.decoded)
            return res.status(401).json({ message: "Invalid Token" });
        res.locals.token = token.decodedToken?.payload;
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
    next();
}

export async function adminRoleRequiringMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | undefined> {
    const { id } = res.locals.token;
    const user = await UserService.GetUser(id);

    if (user?.role !== "admin") {
        return res.status(401).json({
            message: "Admin role is required to access the following endpoint",
        });
    }
    next();
}