// User types
export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

// Auth types
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message?: string;
  token: string;
}

// Calorie types
export interface CalorieRequest {
  dish_name: string;
  servings: number;
}

export interface CalorieResponse {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  source: string;
}

// Meal history item
export interface MealHistoryItem extends CalorieResponse {
  id: string;
  timestamp: number;
}

// API Error response
export interface ApiError {
  message: string;
  status?: number;
}

