import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { MealHistoryItem, CalorieResponse } from "@/types";

interface MealState {
  history: MealHistoryItem[];
  addMeal: (meal: CalorieResponse) => void;
  removeMeal: (id: string) => void;
  clearHistory: () => void;
}

export const useMealStore = create<MealState>()(
  persist(
    (set) => ({
      history: [],
      addMeal: (meal: CalorieResponse) =>
        set((state) => ({
          history: [
            {
              ...meal,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
            },
            ...state.history,
          ].slice(0, 50), // Keep last 50 meals
        })),
      removeMeal: (id: string) =>
        set((state) => ({
          history: state.history.filter((meal) => meal.id !== id),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "meal-history-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

