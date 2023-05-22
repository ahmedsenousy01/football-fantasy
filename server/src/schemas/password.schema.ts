import { z } from "zod";

export const passwordValidation = z
    .string({ required_error: "Password is required" })
    .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least one uppercase letter.",
    })
    .regex(/^(?=.*[a-z])/, {
        message: "Password must contain at least one lowercase letter.",
    })
    .regex(/^(?=.*\d)/, {
        message: "Password must contain at least one digit.",
    })
    .min(8, "Password must be at least 8 characters in length")
    .max(20, "Password must be at most 20 characters in length");
