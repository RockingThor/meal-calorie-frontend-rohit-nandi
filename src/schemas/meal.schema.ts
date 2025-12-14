import { z } from "zod";

export const mealSchema = z.object({
  dish_name: z
    .string()
    .min(1, "Dish name is required")
    .max(100, "Dish name must be less than 100 characters")
    .regex(
      /^[a-zA-Z0-9\s\-,.']+$/,
      "Dish name can only contain letters, numbers, spaces, hyphens, commas, and apostrophes"
    ),
  servings: z
    .number({ error: "Servings must be a number" })
    .min(0.1, "Servings must be at least 0.1")
    .max(1000, "Servings must be less than 1000"),
});

export type MealFormData = z.infer<typeof mealSchema>;

