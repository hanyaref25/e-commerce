import z from "zod";

const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" })
      .max(50, { message: "Name must be less than 50 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    rePassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .max(15, { message: "Phone number must be less than 15 digits" })
      .regex(/^[0-9+\s()-]+$/, { message: "Please enter a valid phone number" }),
    terms: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must agree to the Terms of Service and Privacy Policy",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export default signupSchema;

export type SignupFormData = z.infer<typeof signupSchema>;
