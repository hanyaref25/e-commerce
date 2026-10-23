"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  IconArrowLeft,
  IconCheck,
  IconKey,
  IconLock,
  IconMail,
  IconRefresh,
  IconShieldCheck,
} from "@tabler/icons-react";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
  ResetCodeFormData,
  resetCodeSchema,
  ResetPasswordFormData,
  resetPasswordSchema,
} from "../schemas/password.schema";
import {
  forgotPassword,
  resetPassword,
  verifyResetCode,
} from "../server/password.action";

type Step = 1 | 2 | 3;

const STEP_LABELS: { id: Step; label: string }[] = [
  { id: 1, label: "Email" },
  { id: 2, label: "Code" },
  { id: 3, label: "Password" },
];

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 lg:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-primary-600">
            Fresh<span className="text-gray-800">Cart</span>
          </span>

          <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2">
            {step === 1 && "Forgot your password?"}
            {step === 2 && "Check your email"}
            {step === 3 && "Set a new password"}
          </h1>

          <p className="text-sm text-gray-600">
            {step === 1 &&
              "Enter the email linked to your account and we'll send you a 6-digit reset code."}
            {step === 2 && (
              <>
                We sent a code to{" "}
                <strong className="text-gray-800">{email}</strong>.
              </>
            )}
            {step === 3 && (
              <>
                Choose a strong new password for{" "}
                <strong className="text-gray-800">{email}</strong>.
              </>
            )}
          </p>
        </div>

        <StepIndicator step={step} />

        {step === 1 && (
          <EmailStep
            onSuccess={(value) => {
              setEmail(value);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <CodeStep
            email={email}
            onVerified={() => setStep(3)}
            onChangeEmail={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <PasswordStep
            email={email}
            onSuccess={() => router.push("/login")}
          />
        )}

        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-semibold"
          >
            <IconArrowLeft stroke={2} className="size-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  return (
    <ol className="flex items-center justify-center gap-2 mb-8">
      {STEP_LABELS.map((item, index) => {
        const isDone = step > item.id;
        const isActive = step === item.id;

        return (
          <li key={item.id} className="flex items-center gap-2">
            <span
              className={`size-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                isDone
                  ? "bg-emerald-500 text-white"
                  : isActive
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {isDone ? <IconCheck stroke={3} className="size-4" /> : item.id}
            </span>
            <span
              className={`text-xs font-semibold ${
                isActive || isDone ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {item.label}
            </span>
            {index < STEP_LABELS.length - 1 && (
              <span className="w-6 h-px bg-gray-200 mx-1" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function EmailStep({ onSuccess }: { onSuccess: (email: string) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const result = await forgotPassword(data.email);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    onSuccess(data.email);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Email address
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
            {...register("email")}
          />
          <IconMail
            stroke={2}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-colors"
      >
        {isSubmitting ? "Sending code..." : "Send reset code"}
      </button>
    </form>
  );
}

function CodeStep({
  email,
  onVerified,
  onChangeEmail,
}: {
  email: string;
  onVerified: () => void;
  onChangeEmail: () => void;
}) {
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetCodeFormData>({
    defaultValues: { resetCode: "" },
    resolver: zodResolver(resetCodeSchema),
  });

  const onSubmit = async (data: ResetCodeFormData) => {
    const result = await verifyResetCode(data.resetCode);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    onVerified();
  };

  const handleResend = async () => {
    setIsResending(true);
    const result = await forgotPassword(email);
    setIsResending(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label
          htmlFor="resetCode"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Reset code
        </label>
        <div className="relative">
          <input
            id="resetCode"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="123456"
            className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl tracking-[0.4em] text-center font-bold text-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
            {...register("resetCode")}
          />
          <IconKey
            stroke={2}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
        {errors.resetCode && (
          <span className="text-red-500 text-sm mt-1">
            {errors.resetCode.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-colors"
      >
        {isSubmitting ? "Verifying..." : "Verify code"}
      </button>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={onChangeEmail}
          className="text-gray-500 hover:text-gray-700 font-medium"
        >
          Change email
        </button>

        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 disabled:opacity-50 font-semibold"
        >
          <IconRefresh stroke={2} className="size-4" />
          {isResending ? "Sending..." : "Resend code"}
        </button>
      </div>
    </form>
  );
}

function PasswordStep({
  email,
  onSuccess,
}: {
  email: string;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    defaultValues: { newPassword: "", rePassword: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    const result = await resetPassword(email, data.newPassword);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    onSuccess();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label
          htmlFor="newPassword"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          New password
        </label>
        <div className="relative">
          <input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
            {...register("newPassword")}
          />
          <IconLock
            stroke={2}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
        {errors.newPassword && (
          <span className="text-red-500 text-sm mt-1">
            {errors.newPassword.message}
          </span>
        )}
      </div>

      <div>
        <label
          htmlFor="rePassword"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Confirm new password
        </label>
        <div className="relative">
          <input
            id="rePassword"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
            {...register("rePassword")}
          />
          <IconShieldCheck
            stroke={2}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
        {errors.rePassword && (
          <span className="text-red-500 text-sm mt-1">
            {errors.rePassword.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-colors"
      >
        {isSubmitting ? "Resetting..." : "Reset password"}
      </button>
    </form>
  );
}
