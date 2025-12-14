"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mealSchema, type MealFormData } from "@/schemas/meal.schema";
import { useGetCalories } from "@/hooks/useCalories";
import { useDebounce } from "@/hooks/useDebounce";
import { FOOD_SUGGESTIONS } from "@/data/foods";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search, Utensils } from "lucide-react";

interface MealFormProps {
  onResult?: () => void;
}

export function MealForm({ onResult }: MealFormProps) {
  const { mutate: getCalories, isPending } = useGetCalories();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      dish_name: "",
      servings: 1,
    },
  });

  const dishName = form.watch("dish_name");
  const debouncedDishName = useDebounce(dishName, 300);

  const filteredSuggestions = useMemo(() => {
    if (!debouncedDishName || debouncedDishName.length < 1) return [];
    const searchTerm = debouncedDishName.toLowerCase();
    return FOOD_SUGGESTIONS.filter((food) =>
      food.toLowerCase().includes(searchTerm)
    ).slice(0, 8);
  }, [debouncedDishName]);

  // Reset highlighted index when suggestions change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [filteredSuggestions]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectSuggestion = (food: string) => {
    form.setValue("dish_name", food);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          e.preventDefault();
          selectSuggestion(filteredSuggestions[highlightedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const onSubmit = (data: MealFormData) => {
    getCalories(data, {
      onSuccess: () => {
        onResult?.();
      },
    });
  };

  return (
    <Card className="w-full border-0 shadow-lg bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Utensils className="h-5 w-5 text-primary" />
          Calorie Lookup
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="dish_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                      <Input
                        placeholder="e.g., chicken biryani, caesar salad"
                        {...field}
                        ref={inputRef}
                        disabled={isPending}
                        className="pl-10 bg-background/50 h-11"
                        onFocus={() => setShowSuggestions(true)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                      />
                      {showSuggestions && filteredSuggestions.length > 0 && (
                        <div
                          ref={suggestionsRef}
                          className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg overflow-hidden max-h-51"
                        >
                          {filteredSuggestions.map((food, index) => (
                            <button
                              key={food}
                              type="button"
                              className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-2 ${
                                index === highlightedIndex
                                  ? "bg-accent text-accent-foreground cursor-pointer"
                                  : "hover:bg-accent/50"
                              }`}
                              onClick={() => selectSuggestion(food)}
                              onMouseEnter={() => setHighlightedIndex(index)}
                            >
                              <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                              <span>{food}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter the name of any dish to get its calorie information
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="servings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Servings</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      min="0.1"
                      max="1000"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      disabled={isPending}
                      className="bg-background/50 h-11"
                    />
                  </FormControl>
                  <FormDescription>
                    How many servings are you having? (0.1 - 1000)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full font-semibold h-11 cursor-pointer"
              size="lg"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Looking up calories...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Get Calorie Info
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
