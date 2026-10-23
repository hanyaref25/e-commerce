import z from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

export const resetCodeSchema = z.object({
  resetCode: z
    .string()
    .length(6, { message: "The reset code is 6 digits" })
    .regex(/^[0-9]{6}$/, { message: "The reset code is 6 digits" }),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    rePassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.newPassword === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetCodeFormData = z.infer<typeof resetCodeSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
