import { NextFunction, Request, RequestHandler, Response } from "express";
import { Session } from "express-session";
import bcrypt from "bcrypt";
import crypto from "crypto";
import rateLimit from "express-rate-limit";

interface SessionSupportingCSRFToken extends Session {
    csrfToken?: string;
}

declare module "express" {
    interface Request {
        session: SessionSupportingCSRFToken;
    }
}

class SecurityMiddleware {
    rateLimiter: RequestHandler;

    constructor() {
        this.rateLimiter = rateLimit({
            windowMs: 60 * 1000,
            max: 30,
            standardHeaders: true,
            legacyHeaders: false,
            message: {
                message:
                    "Too many requests, You can only send 30 requests per minute.",
            },
        });
    }

    private generateCSRFToken(): string {
        return crypto.randomBytes(32).toString("hex");
    }

    public getHashedCSRFToken(sessionId: string): string {
        return bcrypt.hashSync(this.generateCSRFToken(), sessionId);
    }

    public static async csrfTokenRequiringMiddleware(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        const { _csrf } = req.body;
        if (req.session.csrfToken) {
            const tokenMatches = bcrypt.compareSync(
                _csrf,
                req.session.csrfToken
            );
            if (tokenMatches) {
                next();
            }
        }
        return res.status(403).json({ message: "Invalid CSRF token" });
    }
}

export default new SecurityMiddleware();
