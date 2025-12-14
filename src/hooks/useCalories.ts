"use client";

import { useMutation } from "@tanstack/react-query";
import { caloriesApi } from "@/lib/api";
import { useMealStore } from "@/stores/mealStore";
import type { CalorieRequest, CalorieResponse } from "@/types";

export function useGetCalories() {
  const addMeal = useMealStore((state) => state.addMeal);

  return useMutation<CalorieResponse, Error, CalorieRequest>({
    mutationFn: caloriesApi.getCalories,
    onSuccess: (data) => {
      addMeal(data);
    },
  });
}

