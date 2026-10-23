"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { IconLock, IconUser } from "@tabler/icons-react";
import {
  ChangePasswordFormData,
  changePasswordSchema,
  UpdateProfileFormData,
  updateProfileSchema,
} from "../schemas/profile.schema";
import { changeMyPassword, updateMe } from "../services/profile.actions";
import { useAuth } from "@/src/featurs/auth/hooks/useAuth";
import { updateUser } from "@/src/featurs/auth/slices/auth.slice";
import { AppDispatch } from "@/src/store/store";

interface ProfileSettingsScreenProps {
  initialProfile?: {
    name?: string;
    email?: string;
    phone?: string;
  } | null;
}

export default function ProfileSettingsScreen({
  initialProfile,
}: ProfileSettingsScreenProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();

  const profileForm = useForm<UpdateProfileFormData>({
    defaultValues: {
      name: initialProfile?.name ?? user?.name ?? "",
      email: initialProfile?.email ?? user?.email ?? "",
      phone: initialProfile?.phone ?? "",
    },
    resolver: zodResolver(updateProfileSchema),
  });

  const passwordForm = useForm<ChangePasswordFormData>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  const onUpdateProfile = async (data: UpdateProfileFormData) => {
    const result = await updateMe(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    dispatch(updateUser({ name: data.name, email: data.email }));
    profileForm.reset(data);
    router.refresh();
    toast.success(result.message);
  };

  const onChangePassword = async (data: ChangePasswordFormData) => {
    const result = await changeMyPassword(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    passwordForm.reset();
    toast.success(result.message);
  };

  return (
    <div className="space-y-6">
      {/* Profile information */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="size-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
            <IconUser stroke={2} className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Profile Information
            </h2>
            <p className="text-xs text-gray-500">
              Update the name, email and phone on your account.
            </p>
          </div>
        </div>

        <form
          className="space-y-5"
          onSubmit={profileForm.handleSubmit(onUpdateProfile)}
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full name*
            </label>
            <input
              id="name"
              className="form-control"
              placeholder="Ahmed Abd Al-Muti"
              {...profileForm.register("name")}
            />
            {profileForm.formState.errors.name && (
              <span className="text-red-500 text-sm">
                {profileForm.formState.errors.name.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email*
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="form-control"
                placeholder="you@example.com"
                {...profileForm.register("email")}
              />
              {profileForm.formState.errors.email && (
                <span className="text-red-500 text-sm">
                  {profileForm.formState.errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone number*
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                className="form-control"
                placeholder="01000000000"
                {...profileForm.register("phone")}
              />
              {profileForm.formState.errors.phone && (
                <span className="text-red-500 text-sm">
                  {profileForm.formState.errors.phone.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={profileForm.formState.isSubmitting}
            className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            {profileForm.formState.isSubmitting
              ? "Saving..."
              : "Save changes"}
          </button>
        </form>
      </section>

      {/* Change password */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="size-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
            <IconLock stroke={2} className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
            <p className="text-xs text-gray-500">
              Use a password you don&apos;t use anywhere else.
            </p>
          </div>
        </div>

        <form
          className="space-y-5"
          onSubmit={passwordForm.handleSubmit(onChangePassword)}
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="currentPassword" className="text-sm font-medium">
              Current password*
            </label>
            <input
              id="currentPassword"
              type="password"
              autoComplete="current-password"
              className="form-control"
              {...passwordForm.register("currentPassword")}
            />
            {passwordForm.formState.errors.currentPassword && (
              <span className="text-red-500 text-sm">
                {passwordForm.formState.errors.currentPassword.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                New password*
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className="form-control"
                {...passwordForm.register("password")}
              />
              {passwordForm.formState.errors.password && (
                <span className="text-red-500 text-sm">
                  {passwordForm.formState.errors.password.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="rePassword" className="text-sm font-medium">
                Confirm new password*
              </label>
              <input
                id="rePassword"
                type="password"
                autoComplete="new-password"
                className="form-control"
                {...passwordForm.register("rePassword")}
              />
              {passwordForm.formState.errors.rePassword && (
                <span className="text-red-500 text-sm">
                  {passwordForm.formState.errors.rePassword.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={passwordForm.formState.isSubmitting}
              className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              {passwordForm.formState.isSubmitting
                ? "Updating..."
                : "Update password"}
            </button>

            <Link
              href="/forget-password"
              className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
            >
              Forgot your current password?
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
