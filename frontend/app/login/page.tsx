"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { setAccessToken } from "@/lib/auth";
import { toast } from "sonner";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await api.post("/auth/login", data);

      setAccessToken(res.data.data.accessToken);

      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg border px-4 py-2 cursor-pointer"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <a href="/register" className="underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}