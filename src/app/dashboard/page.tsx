import { Metadata } from "next";
import { DashboardContent } from "./DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your NutriTrack dashboard - view your calorie tracking summary",
};

export default function DashboardPage() {
  return <DashboardContent />;
}

