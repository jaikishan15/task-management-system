"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "sonner";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await api.post("/auth/register", data);
      toast.success("Registration successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md border rounded-lg p-6 space-y-4"
      >
        <h1 className="text-2xl font-semibold">Register</h1>

        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full border rounded px-3 py-2"
        />

        <button type="submit" className="w-full border rounded px-4 py-2 cursor-pointer">
          Register
        </button>
      </form>
    </div>
  );
}