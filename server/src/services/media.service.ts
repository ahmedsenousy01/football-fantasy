import UserService from "@/services/user.service";
import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import config from "@/core/config";

class MediaStorageService {
    private s3: S3Client;

    constructor() {
        this.s3 = new S3Client({
            credentials: {
                accessKeyId: config.upload.aws_s3.accessKey,
                secretAccessKey: config.upload.aws_s3.secretAccessKey,
            },
            region: config.upload.aws_s3.bucketRegion,
        });
    }

    public async uploadImage(
        file: Express.Multer.File | undefined
    ): Promise<{ status: boolean; imageName: string | null }> {
        const randomFileName = crypto.randomBytes(32).toString("hex");
        const s3PutCommand = new PutObjectCommand({
            Bucket: config.upload.aws_s3.bucketName,
            Key: randomFileName,
            Body: file?.buffer,
            ContentType: file?.mimetype,
        });
        const {
            $metadata: { httpStatusCode },
        } = await this.s3.send(s3PutCommand);

        if (httpStatusCode === 200)
            return { status: true, imageName: randomFileName };

        return { status: false, imageName: null };
    }

    public async updateImage(
        file: Express.Multer.File | undefined,
        profilePicture: string
    ): Promise<{ status: boolean; imageName: string | null }> {
        const s3PutCommand = new PutObjectCommand({
            Bucket: config.upload.aws_s3.bucketName,
            Key: profilePicture,
            Body: file?.buffer,
            ContentType: file?.mimetype,
        });
        const {
            $metadata: { httpStatusCode },
        } = await this.s3.send(s3PutCommand);

        if (httpStatusCode === 200)
            return { status: true, imageName: profilePicture };

        return { status: false, imageName: null };
    }

    public async deleteImage(
        id: string
    ): Promise<{ status: boolean; message: string }> {
        const user = await UserService.GetUser(id);
        const profilePicture = user?.profilePicture || undefined;

        const s3DeleteCommand = new DeleteObjectCommand({
            Bucket: config.upload.aws_s3.bucketName,
            Key: profilePicture,
        });
        const {
            $metadata: { httpStatusCode },
        } = await this.s3.send(s3DeleteCommand);

        if (httpStatusCode === 200)
            return { status: true, message: "image deleted successfully" };

        return { status: false, message: "image deletion failed" };
    }

    public async generateProfilePictureUrl(
        id: string
    ): Promise<{ status: boolean; imageUrl: string }> {
        const user = await UserService.GetUser(id);
        const profilePicture = user?.profilePicture || undefined;

        const s3GetCommand = new GetObjectCommand({
            Bucket: config.upload.aws_s3.bucketName,
            Key: profilePicture,
        });
        const imageUrl = await getSignedUrl(this.s3, s3GetCommand, {
            expiresIn: 3600,
        });

        if (imageUrl) return { status: true, imageUrl };

        return { status: false, imageUrl };
    }
}

export default new MediaStorageService();
