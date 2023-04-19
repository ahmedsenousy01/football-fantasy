import jwt, { JwtPayload } from "jsonwebtoken";
import config from "@/core/config";
import { VerifyTokenOutput } from "@/utils/interfaces/jwt.interfaces";

export default class JWTService {
    public static GenerateNewToken({
        payload,
        expiresIn,
    }: {
        payload: JwtPayload;
        expiresIn: string | number;
    }): string {
        const token = jwt.sign(payload, config.jwt.secret, {
            expiresIn
        });
        return token;
    }

    public static VerifyToken(token: string): VerifyTokenOutput {
        try {
            const decodedToken = jwt.verify(token, config.jwt.secret, {
                complete: true,
            });
            return { decoded: true, decodedToken };
        } catch (error) {
            return { decoded: false, decodedToken: null };
        }
    }
}
