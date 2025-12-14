"use client";

import { useMealStore } from "@/stores/mealStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History, Trash2, X } from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";

export function MealHistory() {
  const { history, removeMeal, clearHistory } = useMealStore();

  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="w-full border-0 shadow-lg bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <History className="h-5 w-5 text-primary" />
              Recent Searches
            </CardTitle>
            <CardDescription>
              Your last {history.length} calorie{" "}
              {history.length === 1 ? "lookup" : "lookups"}
            </CardDescription>
          </div>
          {history.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="text-muted-foreground hover:text-white cursor-pointer"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Dish</TableHead>
                <TableHead className="text-center">Servings</TableHead>
                <TableHead className="text-right">Total Cal</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.slice(0, 10).map((meal) => (
                <TableRow key={meal.id} className="group">
                  <TableCell className="font-medium capitalize">
                    <div className="flex flex-col">
                      <span>{meal.dish_name}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(meal.timestamp)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{meal.servings}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    {meal.total_calories.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeMeal(meal.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
