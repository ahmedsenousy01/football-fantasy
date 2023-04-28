import { Request, Response, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import UserSchemas from "@/schemas/user.schemas";
import validationMiddleware from "@/middleware/validation.middleware";
import UserService from "@/services/user.service";
import { jwtTokenRequiringMiddleware } from "@/middleware/jwt.middleware";
import catchAsyncError from "@/utils/tools/catchAsyncError";
import { multerMiddleware } from "@/middleware/multer.middleware";
import MediaStorageService from "@/services/media.service";

class UserController implements Controller {
    public path = "/users";
    public router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(UserSchemas.create),
            catchAsyncError(this.create)
        );

        this.router.post(
            `${this.path}/upload-profile-picture`,
            jwtTokenRequiringMiddleware,
            multerMiddleware,
            validationMiddleware(UserSchemas.uploadImage),
            catchAsyncError(this.uploadProfilePicture)
        );

        this.router.post(
            `${this.path}/login`,
            validationMiddleware(UserSchemas.login),
            catchAsyncError(this.login)
        );

        this.router.post(
            `${this.path}/request-verification-code`,
            jwtTokenRequiringMiddleware,
            catchAsyncError(this.requestVerification)
        );

        this.router.get(
            `${this.path}`,
            jwtTokenRequiringMiddleware,
            catchAsyncError(this.getAllUsers)
        );

        this.router.get(
            `${this.path}/details`,
            jwtTokenRequiringMiddleware,
            catchAsyncError(this.getUserById)
        );

        this.router.put(
            `${this.path}/verify-user`,
            jwtTokenRequiringMiddleware,
            catchAsyncError(this.verifyUser)
        );

        this.router.put(
            `${this.path}/:id`,
            jwtTokenRequiringMiddleware,
            catchAsyncError(this.updateUser)
        );

        this.router.delete(
            `${this.path}/profile-picture`,
            jwtTokenRequiringMiddleware,
            catchAsyncError(this.deleteProfilePicture)
        );

        this.router.delete(
            `${this.path}/:id`,
            jwtTokenRequiringMiddleware,
            catchAsyncError(this.deleteUser)
        );
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { body } = req;
        const serviceResponse = await UserService.CreateUser(body);
        const statusCode: number = serviceResponse.status ? 201 : 400;

        return res.status(statusCode).json({
            message: serviceResponse.message,
            data: serviceResponse.data,
        });
    }

    async getAllUsers(req: Request, res: Response): Promise<Response> {
        const data = await UserService.GetAllUsers();
        return res.status(200).json({ data });
    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        const { id } = res.locals.token;
        const user = await UserService.GetUser(id);
        console.log(user);
        const data = {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            role: user?.role,
            isVerified: user?.isVerified,
            profilePicture: (
                await MediaStorageService.generateProfilePictureUrl(id)
            ).imageUrl,
            league: user?.accountLeague,
            teams: user?.teams,
            budget: user?.budget,
        };
        return res.status(200).json({ data });
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { body } = req;
        const user = await UserService.UpdateUser(id, body);
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json({ data: user });
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const deleted = await UserService.DeleteUser(id);
        return res.status(200).json({ data: deleted });
    }

    async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        const serviceResponse = await UserService.login(email, password);

        if (!serviceResponse.status) {
            return res.status(404).json({
                message: serviceResponse.message,
            });
        }

        return res.status(200).json({
            data: {
                message: serviceResponse.message,
                auth_token: serviceResponse.token,
            },
        });
    }

    async requestVerification(req: Request, res: Response): Promise<Response> {
        const { id } = res.locals.token;
        const serviceResponse = await UserService.requestVerificationCode(id);
        const statusCode: number = serviceResponse.status ? 200 : 500;

        return res
            .status(statusCode)
            .json({ message: serviceResponse.message });
    }

    async verifyUser(req: Request, res: Response): Promise<Response> {
        const { id } = res.locals.token;
        const { code } = req.body;

        const serviceResponse = await UserService.verifyUser(id, code);
        const statusCode: number = serviceResponse.verified ? 200 : 500;

        return res
            .status(statusCode)
            .json({ message: serviceResponse.message });
    }

    async uploadProfilePicture(req: Request, res: Response): Promise<Response> {
        const { id } = res.locals.token;
        const user = await UserService.GetUser(id);
        let serviceResponse;

        if (user?.profilePicture) {
            serviceResponse = await MediaStorageService.updateImage(
                req.file,
                user?.profilePicture
            );
        } else {
            serviceResponse = await MediaStorageService.uploadImage(req.file);
        }

        if (serviceResponse?.status) {
            const UserServiceResponse = await UserService.UpdateUser(id, {
                profilePicture: serviceResponse.imageName,
            });
            if (
                UserServiceResponse?.profilePicture ===
                serviceResponse.imageName
            )
                return res
                    .status(200)
                    .json({ message: "Image uploaded successfully" });
        }

        return res.status(400).json({ message: "Image upload failed" });
    }

    async deleteProfilePicture(req: Request, res: Response): Promise<Response> {
        const { id } = res.locals.token;
        const serviceResponse = await MediaStorageService.deleteImage(id);
        const statusCode: number = serviceResponse.status ? 200 : 500;

        return res
            .status(statusCode)
            .json({ message: serviceResponse.message });
    }
}

export default new UserController();
