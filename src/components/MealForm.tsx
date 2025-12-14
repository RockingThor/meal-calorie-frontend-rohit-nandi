"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mealSchema, type MealFormData } from "@/schemas/meal.schema";
import { useGetCalories } from "@/hooks/useCalories";
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

  const form = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      dish_name: "",
      servings: 1,
    },
  });

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
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="e.g., chicken biryani, caesar salad"
                        {...field}
                        disabled={isPending}
                        className="pl-10 bg-background/50 h-11"
                      />
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
