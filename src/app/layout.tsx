import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NutriTrack - Smart Calorie Counter",
    template: "%s | NutriTrack",
  },
  description:
    "Track your meal calories instantly with AI-powered nutrition data from USDA FoodData Central. Get accurate calorie counts for any dish.",
  keywords: [
    "calorie counter",
    "nutrition tracker",
    "meal calories",
    "food database",
    "USDA nutrition",
  ],
  authors: [{ name: "NutriTrack" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NutriTrack",
    title: "NutriTrack - Smart Calorie Counter",
    description:
      "Track your meal calories instantly with AI-powered nutrition data",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster position="top-center" richColors closeButton />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
