import { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import Link from "next/link";
import { Utensils } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your NutriTrack account to track your meal calories",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-background to-secondary/30">
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <Link
        href="/"
        className="flex items-center gap-2 mb-8 text-foreground hover:text-primary transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <Utensils className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold tracking-tight">NutriTrack</span>
      </Link>

      <AuthForm mode="login" />
    </main>
  );
}

