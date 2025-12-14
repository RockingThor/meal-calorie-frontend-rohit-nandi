"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MealForm } from "@/components/MealForm";
import { ResultCard } from "@/components/ResultCard";
import { MealHistory } from "@/components/MealHistory";
import { Navbar } from "@/components/Navbar";
import { useMealStore } from "@/stores/mealStore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

export function CaloriesContent() {
  const [showResult, setShowResult] = useState(false);
  const history = useMealStore((state) => state.history);
  const latestMeal = history[0];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Calorie Lookup
            </h1>
            <p className="text-muted-foreground mt-1">
              Get instant calorie information for any dish
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <MealForm onResult={() => setShowResult(true)} />

              <Alert className="border-primary/20 bg-primary/5">
                <Lightbulb className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm">
                  <strong>Pro tip:</strong> Try searching for dishes like
                  &quot;grilled salmon&quot;, &quot;pasta carbonara&quot;, or
                  &quot;avocado toast&quot; for accurate calorie data.
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-6">
              {showResult && latestMeal && <ResultCard data={latestMeal} />}

              {history.length > 0 && <MealHistory />}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
