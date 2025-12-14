import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import {
  ArrowRight,
  Flame,
  Database,
  Zap,
  Shield,
  Utensils,
  Calculator,
  History,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Database,
      title: "USDA Database",
      description:
        "Access nutrition data from the official USDA FoodData Central database",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Get calorie information in seconds with our fast and reliable API",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your data is protected with industry-standard security measures",
    },
    {
      icon: History,
      title: "Track History",
      description:
        "Keep track of all your calorie lookups and monitor your eating habits",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-1.5 text-sm font-medium"
            >
              <Flame className="w-3.5 h-3.5 mr-1.5 text-orange-500" />
              Powered by USDA FoodData Central
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Track Your Calories
              <span className="block text-primary mt-2">Effortlessly</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Get instant, accurate calorie information for any dish. Simply
              enter the meal name and servings to receive detailed nutrition
              data from the official USDA database.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto group px-8 cursor-pointer"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 cursor-pointer"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Demo Preview */}
            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
              <Card className="max-w-md mx-auto border-0 bg-card/80 shadow-none overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Utensils className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Chicken Biryani</p>
                      <p className="text-sm text-muted-foreground">
                        2 servings
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-secondary/50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold">280</p>
                      <p className="text-xs text-muted-foreground">
                        cal/serving
                      </p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-primary">560</p>
                      <p className="text-xs text-muted-foreground">
                        total calories
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Track Nutrition
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and accurate calorie tracking powered by the most
              comprehensive food database available.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <CardContent className="p-10 md:p-16 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Start Tracking?
                  </h2>
                  <p className="text-primary-foreground/80 mb-0 md:mb-0">
                    Join thousands of users who trust NutriTrack for accurate
                    calorie information.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/register">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full group cursor-pointer"
                    >
                      <Calculator className="mr-2 h-4 w-4" />
                      Create Free Account
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Utensils className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">NutriTrack</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NutriTrack. Data provided by USDA
              FoodData Central.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
