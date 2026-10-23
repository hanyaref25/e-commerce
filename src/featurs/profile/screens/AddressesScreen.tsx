"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  IconHome,
  IconMapPin,
  IconPhone,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { AddressFormData, addressSchema } from "../schemas/address.schema";
import {
  addAddress,
  getAddresses,
  removeAddress,
} from "../services/address.actions";
import { Address } from "../types/address.types";

export default function AddressesScreen() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    defaultValues: { name: "", details: "", phone: "", city: "" },
    resolver: zodResolver(addressSchema),
  });

  const refreshAddresses = useCallback(async () => {
    const result = await getAddresses();

    if (result.success && result.data) {
      setAddresses(result.data);
    } else if (!result.success) {
      toast.error(result.message);
    }

    setIsLoading(false);
  }, []);

 
  useEffect(() => {
    let ignore = false;

    getAddresses().then((result) => {
      if (ignore) return;

      if (result.success && result.data) {
        setAddresses(result.data);
      } else if (!result.success) {
        toast.error(result.message);
      }

      setIsLoading(false);
    });

    return () => {
      ignore = true;
    };
  }, []);

  const onAdd = async (data: AddressFormData) => {
    const result = await addAddress(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    reset();
    setIsFormOpen(false);
    await refreshAddresses();
  };

  const onRemove = async (addressId: string) => {
    setDeletingId(addressId);
    const result = await removeAddress(addressId);
    setDeletingId(null);
    setConfirmId(null);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    await refreshAddresses();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Addresses</h2>
          <p className="text-sm text-gray-500">
            These are the addresses you can ship your orders to.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFormOpen((open) => !open)}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          {isFormOpen ? (
            <IconX stroke={2} className="size-4.5" />
          ) : (
            <IconPlus stroke={2} className="size-4.5" />
          )}
          <span>{isFormOpen ? "Cancel" : "Add New Address"}</span>
        </button>
      </div>

      {/* Add form */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit(onAdd)}
          noValidate
          className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 sm:p-8 space-y-5"
        >
          <h3 className="text-lg font-bold text-gray-900">New address</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Address name*
              </label>
              <input
                id="name"
                className="form-control"
                placeholder="Home"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="city" className="text-sm font-medium">
                City*
              </label>
              <input
                id="city"
                className="form-control"
                placeholder="Cairo"
                {...register("city")}
              />
              {errors.city && (
                <span className="text-red-500 text-sm">
                  {errors.city.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="details" className="text-sm font-medium">
              Address details*
            </label>
            <input
              id="details"
              className="form-control"
              placeholder="Street, building, apartment…"
              {...register("details")}
            />
            {errors.details && (
              <span className="text-red-500 text-sm">
                {errors.details.message}
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
              className="form-control"
              placeholder="01000000000"
              {...register("phone")}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            {isSubmitting ? "Saving..." : "Save address"}
          </button>
        </form>
      )}

      {/* List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl border border-gray-100 h-40 animate-pulse"
            />
          ))}
        </div>
      ) : addresses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xs">
          <div className="size-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
            <IconMapPin stroke={1.5} className="size-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            No saved addresses
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Add an address so your orders know where to go.
          </p>
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            <IconPlus stroke={2} className="size-4.5" />
            <span>Add your first address</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="size-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                    <IconHome stroke={1.8} className="size-4.5" />
                  </span>
                  <h3 className="font-semibold text-gray-900 truncate">
                    {address.name}
                  </h3>
                </div>

                {confirmId === address._id ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onRemove(address._id)}
                      disabled={deletingId === address._id}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 disabled:opacity-50"
                    >
                      {deletingId === address._id ? "Deleting..." : "Delete"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmId(null)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmId(address._id)}
                    aria-label={`Remove ${address.name}`}
                    className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <IconTrash stroke={1.8} className="size-4.5" />
                  </button>
                )}
              </div>

              <p className="text-sm text-gray-600 mt-3">{address.details}</p>

              <div className="mt-3 space-y-1.5 text-xs text-gray-500">
                <p className="flex items-center gap-1.5">
                  <IconPhone stroke={1.8} className="size-3.5" />
                  {address.phone}
                </p>
                <p className="flex items-center gap-1.5">
                  <IconMapPin stroke={1.8} className="size-3.5" />
                  {address.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
