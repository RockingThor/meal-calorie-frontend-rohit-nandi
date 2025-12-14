"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { isTokenExpired } from "@/lib/auth";

export function useAuthGuard() {
  const router = useRouter();
  const { token, isAuthenticated, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check auth status
    const checkAuth = () => {
      if (!isAuthenticated || !token) {
        router.replace("/login");
        return;
      }

      // Check if token is expired
      if (isTokenExpired(token)) {
        logout();
        router.replace("/login");
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    // Small delay to allow hydration
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, token, router, logout]);

  return { isLoading, isAuthorized };
}

