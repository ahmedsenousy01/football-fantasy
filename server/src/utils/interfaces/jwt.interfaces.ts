import { Jwt } from "jsonwebtoken";

export interface VerifyTokenOutput {
	decoded: boolean;
	decodedToken: Jwt | null;
}
