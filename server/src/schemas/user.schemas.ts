import { z } from "zod";
import { passwordValidation } from "@/schemas/password.schema";

const UserSchemas = {
    create: z.object({
        body: z
            .object({
                firstName: z.string({
                    required_error: "First Name is required",
                }),
                lastName: z.string({ required_error: "Last Name is required" }),
                email: z
                    .string({ required_error: "Email is required" })
                    .email("Please enter a valid email format"),
                password: passwordValidation,
                confirmPassword: passwordValidation,
            })
            .refine((data) => data.confirmPassword === data.password, {
                message: "Passwords don't match",
                path: ["confirmPassword"],
            }),
    }),
    login: z.object({
        body: z.object({
            email: z
                .string({ required_error: "Email is required" })
                .email("Please enter a valid email format"),
            password: passwordValidation,
        }),
    }),
    uploadImage: z.object({
        file: z.object({
            mimetype: z.enum([
                "image/png",
                "image/jpeg",
                "image/jpg",
                "image/jfif",
            ]),
        }),
    }),
};

export default UserSchemas;
