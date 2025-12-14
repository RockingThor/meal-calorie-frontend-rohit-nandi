import { Metadata } from "next";
import { CaloriesContent } from "./CaloriesContent";

export const metadata: Metadata = {
  title: "Calorie Lookup",
  description:
    "Look up calorie information for any dish using USDA FoodData Central",
};

export default function CaloriesPage() {
  return <CaloriesContent />;
}

