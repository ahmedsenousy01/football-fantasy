import User from "@/interfaces/user.interface";
import UserModel from "@/models/User";
import JWTService from "@/services/jwt.service";
import config from "@/core/config";
import BcryptService from "@/services/bcrypt.service";
import { sendVerificationEmail } from "@/utils/tools/sendEmail";

class UserService {
    private model: typeof UserModel;

    constructor() {
        this.model = UserModel;
    }

    public async GetUser(id: string): Promise<User | null> {
        return await this.model
            .findById(id)
            .populate("accountLeague", "-_id name flag logo")
            .populate("teams", "-_id")
            .exec();
    }

    public async GetUserByEmail(email: string): Promise<User | null> {
        return await this.model.findOne({ email }).exec();
    }

    public async CreateUser(data: User): Promise<{
        status: boolean;
        message: string;
        data: { id: any; email: string } | null;
    }> {
        const userExists = await this.GetUserByEmail(data.email);
        if (userExists)
            return {
                status: false,
                message: "Email already exists",
                data: null,
            };

        data.password = BcryptService.hashPassword(data.password);
        const user: User = await this.model.create(data);
        const { _id, email } = user;
        return {
            status: true,
            message: "Registration Successful",
            data: { id: _id, email },
        };
    }

    public async UpdateUser(
        id: string,
        data: {
            firstName?: string;
            lastName?: string;
            email?: string;
            profilePicture?: string | null;
            verificationCode?: string | null;
            isVerified?: boolean;
        }
    ): Promise<User | null> {
        return await this.model
            .findByIdAndUpdate({ _id: id }, data, { new: true })
            .exec();
    }

    public async DeleteUser(id: string): Promise<User | null> {
        return await this.model.findByIdAndDelete({ _id: id }).exec();
    }

    public async GetAllUsers(): Promise<User[]> {
        return await this.model.find().exec();
    }

    public async login(
        email: string,
        password: string
    ): Promise<{ status: boolean; message: string; token?: string }> {
        const user = await this.GetUserByEmail(email);

        if (user && BcryptService.checkHash(password, user.password)) {
            const token = JWTService.GenerateNewToken({
                expiresIn: config.jwt.tokenDuration.short,
                payload: { id: user._id },
            });

            return {
                status: true,
                message: "Logged In successfully",
                token,
            };
        }

        return {
            status: false,
            message: "Invalided Email or Password",
        };
    }

    public async requestVerificationCode(
        id: string
    ): Promise<{ status: boolean; message: string }> {
        const verificationCode: string = Math.floor(
            Math.random() * 1000000
        ).toString();

        const checkVerified = await this.GetUser(id);
        if (checkVerified?.isVerified)
            return { status: false, message: "User already verified" };

        const user = await this.UpdateUser(id, { verificationCode });
        if (user) {
            const email = user.email;
            await sendVerificationEmail(
                email,
                "account verification code",
                `<h4 style="text-align: center;">Your verification code is: ${verificationCode}</h4>`
            );
            return { status: true, message: "Verification code sent" };
        }

        return { status: false, message: "Verification error" };
    }

    public async verifyUser(
        id: string,
        code: string
    ): Promise<{ verified: boolean; message: string }> {
        const user = await this.GetUser(id);

        if (!user) return { verified: false, message: "User not found" };

        if (user.verificationCode === code) {
            await this.UpdateUser(id, {
                isVerified: true,
                verificationCode: null,
            });
            return { verified: true, message: "Verification Successful" };
        }

        return { verified: false, message: "Invalid verification code" };
    }
}

export default new UserService();
