"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconUserPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import signupSchema, { SignupFormData } from "@/src/featurs/auth/schemas/signup.schema";
import { signupAction } from "@/src/featurs/auth/server/signup.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log("Submitting form with data:", data);

    const result = await signupAction(data);

    console.log("Server action result:", result);

    if (result.success) {
      toast.success(result.message || "Account created successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      toast.error(result.message || "Failed to create account. Please try again.");
    }
  };














  const password = useWatch({ control, name: "password" }) ?? "";

  const passwordScore = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const passwordStrength =
    passwordScore >= 5
      ? {
          label: "Strong",
          percent: 100,
          barClass: "bg-emerald-500",
          textClass: "text-emerald-600",
        }
      : passwordScore >= 4
        ? {
            label: "Good",
            percent: 75,
            barClass: "bg-amber-400",
            textClass: "text-amber-600",
          }
        : passwordScore >= 2
          ? {
              label: "Fair",
              percent: 50,
              barClass: "bg-orange-500",
              textClass: "text-orange-500",
            }
          : {
              label: "Weak",
              percent: 20,
              barClass: "bg-red-500",
              textClass: "text-red-500",
            };

  return (
    <>
      <div className="w-full bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="mb-8">
          <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-2">
            Create Your Account
          </h2>
          <p className="text-center text-sm sm:text-base">
            Start your fresh journey with us today
          </p>
        </div>

        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ali"
              id="name"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              className="form-control"
              placeholder="ali@example.com"
              id="email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              className="form-control"
              placeholder="create a strong password"
              autoComplete="off"
              id="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}

            {password.length > 0 && (
              <div className="flex items-center gap-2 pt-1">
                <div className="grow h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${passwordStrength.barClass}`}
                    style={{ width: `${passwordStrength.percent}%` }}
                  />
                </div>
                <span
                  className={`text-xs font-semibold ${passwordStrength.textClass}`}
                >
                  {passwordStrength.label}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="rePassword">Confirm Password*</label>
            <input
              type="password"
              className="form-control"
              placeholder="confirm your password"
              autoComplete="off"
              id="rePassword"
              {...register("rePassword")}
            />
            {errors.rePassword && (
              <span className="text-red-500 text-sm">{errors.rePassword.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              className="form-control"
              placeholder="+1 234 567 8900"
              id="phone"
              {...register("phone")}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone.message}</span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="terms"
                className="size-4 accent-primary-600"
                {...register("terms")}
              />
              <label htmlFor="terms" className="ms-2">
                I agree to the{" "}
                <Link href={`/terms`} className="text-primary-600">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href={`/privacy-policy`} className="text-primary-600">
                  Privacy Policy
                </Link>{" "}
                *
              </label>
            </div>
            {errors.terms && (
              <span className="text-red-500 text-sm">{errors.terms.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn flex gap-2 justify-center bg-primary-600 text-white hover:bg-primary-700 cursor-pointer disabled:cursor-not-allowed w-full"
          >
            <IconUserPlus stroke={2} />

            <span>{isSubmitting ? "Creating Account..." : "Create My Account"}</span>
          </button>
        </form>

        <p className="border-t pt-6 border-gray-300/30 my-4 text-center">
          Already have an account?{" "}
          <Link href={`/login`} className="text-primary-600">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
