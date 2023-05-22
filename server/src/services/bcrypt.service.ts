import bcrypt from "bcrypt";

export default class BcryptService {
    public static hashPassword(password: string): string {
        return bcrypt.hashSync(password, 4);
    }

    public static checkHash(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }
}
