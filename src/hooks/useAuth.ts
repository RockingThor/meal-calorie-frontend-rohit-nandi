"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { decodeToken } from "@/lib/auth";
import type { LoginRequest, RegisterRequest, AuthResponse } from "@/types";
import { toast } from "sonner";

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      const user = decodeToken(data.token);
      if (user) {
        setAuth(data.token, user);
        toast.success("Welcome back!");
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      toast.error("Login failed", {
        description: error.message,
      });
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<AuthResponse, Error, RegisterRequest>({
    mutationFn: authApi.register,
    onSuccess: (data, variables) => {
      const user = decodeToken(data.token) || {
        firstName: variables.firstName,
        lastName: variables.lastName,
        email: variables.email,
      };
      setAuth(data.token, user);
      toast.success("Account created!", {
        description: "Welcome to NutriTrack",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error("Registration failed", {
        description: error.message,
      });
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };
}

