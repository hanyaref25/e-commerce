import z from "zod";

const checkoutSchema = z.object({
  details: z
    .string()
    .min(3, { message: "Address details are required" })
    .max(200, { message: "Address details are too long" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be less than 15 digits" })
    .regex(/^[0-9+\s()-]+$/, { message: "Please enter a valid phone number" }),
  city: z.string().min(2, { message: "City is required" }),
  postalCode: z
    .string()
    .min(3, { message: "Postal code is required" })
    .max(10, { message: "Postal code is too long" }),
});

export default checkoutSchema;

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
