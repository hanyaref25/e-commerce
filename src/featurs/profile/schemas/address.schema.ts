import z from "zod";

export const addressSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Give the address a name (e.g. Home)" })
    .max(40, { message: "Address name is too long" }),
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
});

export type AddressFormData = z.infer<typeof addressSchema>;
