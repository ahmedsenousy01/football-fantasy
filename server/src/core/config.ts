import validateEnv from "@/utils/tools/validateEnv";
import dotenv from "dotenv";

const environmentData = dotenv.config();
// This error should crash whole process
if (environmentData.error) throw new Error("Couldn't find .env file");
validateEnv();

export default {
    /**
     * Chosen port
     */
    port: parseInt(process.env.PORT ?? "", 10) || 5000,

    // Set the NODE_ENV to 'development' by default
    nodeEnvironment: (process.env.NODE_ENV as string) || "development",

    /**
     * All DataBase Connection configs
     */
    database: {
        name: process.env.DATABASE_NAME as string,
        password: process.env.MONGO_PASSWORD as string,
        db_url: process.env.MONGO_URL as string,
        user: process.env.MONGO_USERNAME as string,
    },

    /**
     * JWT Configs
     */
    jwt: {
        secret: (process.env.JWT_SECRET as string) || "123",

        /**
         * Token durations available based on user choice
         */
        tokenDuration: {
            long: 60 * 60 * 24 * 30, // 30 Days Validity
            short: 60 * 60 * 24, // 1 Days Validity
            veryShort: 60 * 15, // 15 Minutes Validity
            verify_reset: 60 * 5, // 5 Mins
        },
    },
    /**
     * Football API configuration
     */
    footballAPI: {
        url: process.env.FOOTBALL_API_URL as string,
        key: process.env.FOOTBALL_API_KEY as string,
    },
    /**
     * email Service credentials
     */
    emails: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        sender: process.env.SENDER_EMAIL as string,
        auth: {
            pass: process.env.USER_PASSWORD as string,
            user: process.env.USER_EMAIL as string,
        },
    },
    /**
     * Uploading configs
     */
    upload: {
        maxFileSize: 10 * 1024 * 1024, // for 1MB
        allowedImageExtensions: [
            "jpg",
            "jpeg",
            "png",
            "jfif",
            "pjpeg",
            "pjp",
            "svg",
            "pdf",
        ],
        local: {
            uploadsDirectory: "@/uploads/images",
        },
        aws_s3: {
            bucketName: process.env.AWS_S3_BUCKET_NAME as string,
            bucketRegion: process.env.AWS_S3_BUCKET_REGION as string,
            accessKey: process.env.AWS_S3_ACCESS_KEY as string,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
        },
    },
};
