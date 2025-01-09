import { z } from "zod";

export const signupSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email address")
        .trim()
        .toLowerCase(),
    fullName: z
        .string({ required_error: "Full name is required" })
        .min(1, "Full name cannot be empty")
        .max(50, "Full name is too long")
        .trim(),
    password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters long"),
    profilePic: z
        .string()
        .optional()
});

export const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email address")
        .trim()
        .toLowerCase(),
    password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters long")
});

// Middleware to validate requests
export const validateRequest = (schema) => async (req, res, next) => {
    try {
        const validatedData = await schema.parseAsync(req.body);
        req.validatedData = validatedData;
        next();
    } catch (error) {
        return res.status(400).json({
            errors: error.errors.map(err => ({
                message: err.message
            }))
        });
    }
};