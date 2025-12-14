"use client";

import type { CalorieResponse } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Flame, UtensilsCrossed, Database, Calculator } from "lucide-react";

interface ResultCardProps {
  data: CalorieResponse;
}

export function ResultCard({ data }: ResultCardProps) {
  return (
    <Card className="w-full border-0 shadow-lg bg-linear-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold capitalize flex items-center gap-2">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              {data.dish_name}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="font-normal">
                {data.servings} {data.servings === 1 ? "serving" : "servings"}
              </Badge>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary/50 rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Flame className="h-4 w-4" />
              Per Serving
            </div>
            <div className="text-3xl font-bold text-foreground">
              {data.calories_per_serving.toLocaleString()}
              <span className="text-base font-normal text-muted-foreground ml-1">
                cal
              </span>
            </div>
          </div>
          <div className="bg-primary/10 rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calculator className="h-4 w-4" />
              Total
            </div>
            <div className="text-3xl font-bold text-primary">
              {data.total_calories.toLocaleString()}
              <span className="text-base font-normal text-primary/70 ml-1">
                cal
              </span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Database className="h-4 w-4" />
          <span>Data source: {data.source}</span>
        </div>
      </CardContent>
    </Card>
  );
}
