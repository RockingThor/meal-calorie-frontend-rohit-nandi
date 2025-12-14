# NutriTrack - Meal Calorie Counter

A modern, responsive web application for tracking meal calories using USDA FoodData Central. Built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

![NutriTrack Screenshot](./screenshot.png)

## Features

- **User Authentication** - Secure registration and login with JWT tokens
- **Calorie Lookup** - Search any dish to get accurate calorie information
- **Meal History** - Track and view your past calorie searches
- **Dark/Light Mode** - Beautiful theme toggle with system preference support
- **Responsive Design** - Mobile-first layout that works on all devices
- **Real-time Feedback** - Loading states, success notifications, and error handling

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| State Management | Zustand (with persistence) |
| Data Fetching | Axios + TanStack React Query |
| Forms | react-hook-form + Zod |
| Package Manager | pnpm |

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/meal-calorie-frontend.git
cd meal-calorie-frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/src
  /app
    layout.tsx          # Root layout with providers
    page.tsx            # Landing page
    /login              # Login page
    /register           # Registration page
    /dashboard          # Protected dashboard
    /calories           # Calorie lookup page
  /components
    /ui                 # shadcn/ui components
    /providers          # React context providers
    AuthForm.tsx        # Auth form component
    MealForm.tsx        # Calorie lookup form
    ResultCard.tsx      # Display calorie results
    MealHistory.tsx     # History table
    Navbar.tsx          # Navigation with theme toggle
  /hooks
    useAuth.ts          # Authentication hooks
    useAuthGuard.ts     # Route protection hook
    useCalories.ts      # Calorie API hooks
  /lib
    api.ts              # Axios instance
    auth.ts             # Auth utilities
    utils.ts            # Utility functions
  /schemas
    auth.schema.ts      # Zod validation schemas
    meal.schema.ts
  /stores
    authStore.ts        # Auth state (Zustand)
    mealStore.ts        # Meal history state
  /types
    index.ts            # TypeScript interfaces
```

## API Endpoints

The application connects to the following backend API:

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/auth/register` | POST | No | Register new user |
| `/auth/login` | POST | No | User login |
| `/get-calories` | POST | JWT | Get calorie info |

## Design Decisions

1. **JWT Storage**: Stored in Zustand with localStorage persistence for simplicity and offline support
2. **React Query**: Used for server state management with automatic caching and refetching
3. **Form Handling**: react-hook-form for performance + Zod for type-safe validation
4. **Protected Routes**: Client-side guard via `useAuthGuard` hook with redirect to login
5. **Theme**: next-themes with shadcn's built-in dark mode support

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | `https://flybackend-misty-feather-6458.fly.dev` |

## Scripts

```bash
# Development
pnpm dev          # Start development server

# Build
pnpm build        # Build for production
pnpm start        # Start production server

# Linting
pnpm lint         # Run ESLint
```

## Deployment

This app is ready to deploy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/meal-calorie-frontend)

1. Push your code to GitHub
2. Import the repository on Vercel
3. Add environment variables
4. Deploy!

