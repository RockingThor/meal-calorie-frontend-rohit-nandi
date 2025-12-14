"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import { useMealStore } from "@/stores/mealStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  Flame,
  History,
  TrendingUp,
  ArrowRight,
  UtensilsCrossed,
} from "lucide-react";

export function DashboardContent() {
  const history = useMealStore((state) => state.history);

  // Calculate stats
  const totalLookups = history.length;
  const totalCalories = history.reduce(
    (sum, meal) => sum + meal.total_calories,
    0
  );
  const avgCalories =
    totalLookups > 0 ? Math.round(totalCalories / totalLookups) : 0;

  // Get today's lookups
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaysLookups = history.filter(
    (meal) => meal.timestamp >= today.getTime()
  ).length;

  const stats = [
    {
      title: "Total Lookups",
      value: totalLookups,
      icon: History,
      description: "All time searches",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Today's Lookups",
      value: todaysLookups,
      icon: Calculator,
      description: "Searches today",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Total Calories",
      value: totalCalories.toLocaleString(),
      icon: Flame,
      description: "Tracked across all meals",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Average Calories",
      value: avgCalories.toLocaleString(),
      icon: TrendingUp,
      description: "Per lookup",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here&apos;s an overview of your calorie tracking activity
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <Card
                key={stat.title}
                className="border-0 shadow-lg bg-card/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardDescription>{stat.title}</CardDescription>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Look Up Calories
                </CardTitle>
                <CardDescription>
                  Search for any dish to get instant calorie information from
                  USDA database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/calories">
                  <Button className="w-full sm:w-auto group cursor-pointer">
                    Start Searching
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UtensilsCrossed className="h-5 w-5 text-accent" />
                  Recent Meals
                </CardTitle>
                <CardDescription>
                  Your latest calorie lookups at a glance
                </CardDescription>
              </CardHeader>
              <CardContent>
                {history.length > 0 ? (
                  <div className="space-y-3">
                    {history.slice(0, 3).map((meal) => (
                      <div
                        key={meal.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div>
                          <p className="font-medium capitalize">
                            {meal.dish_name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {meal.servings}{" "}
                            {meal.servings === 1 ? "serving" : "servings"}
                          </p>
                        </div>
                        <Badge variant="secondary" className="font-semibold">
                          {meal.total_calories} cal
                        </Badge>
                      </div>
                    ))}
                    {history.length > 3 && (
                      <Link href="/calories">
                        <Button variant="ghost" className="w-full" size="sm">
                          View all {history.length} lookups
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      No meals tracked yet. Start by looking up your first dish!
                    </p>
                    <Link href="/calories">
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                      >
                        Look up a meal
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
