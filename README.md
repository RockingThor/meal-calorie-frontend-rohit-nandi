# NutriTrack - Meal Calorie Counter

A modern, responsive web application for tracking meal calories using USDA FoodData Central.

# NutriTrack Screenshot
<img width="1512" height="982" alt="Screenshot 2025-12-14 at 10 44 04 AM" src="https://github.com/user-attachments/assets/ad0c7741-ca2f-4fda-a397-d3b5ff06843e" />

<img width="1512" height="982" alt="Screenshot 2025-12-14 at 10 45 09 AM" src="https://github.com/user-attachments/assets/fbe960e6-334a-41c6-9c12-d367e88e36cc" />

## Live Demo

🌐 **Hosted App**: [https://meal-calorie-frontend-rohit-nandi.vercel.app](https://meal-calorie-frontend-rohit-nandi.vercel.app)

---

## Tech Stack

| Layer            | Technology                     |
| ---------------- | ------------------------------ |
| Framework        | Next.js 14 (App Router)        |
| Language         | TypeScript                     |
| Styling          | Tailwind CSS + shadcn/ui       |
| State Management | Zustand (with persistence)     |
| Data Fetching    | Axios + TanStack React Query   |
| Forms            | react-hook-form + Zod          |
| Package Manager  | pnpm                           |

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/calorie-tracking-app.git
   cd calorie-tracking-app
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Configure environment variables:**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and update the API URL if needed.

4. **Start the development server:**

   ```bash
   pnpm dev
   ```

5. **Open the app:**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
pnpm test     # Run tests
```

---

## Decisions & Trade-offs

### Architecture Decisions

1. **Client-Side State with Zustand**
   - Chose Zustand over Redux for simpler boilerplate and better TypeScript inference
   - State is persisted to localStorage for offline support and session continuity

2. **React Query for Server State**
   - Separates server state from client state
   - Provides automatic caching, background refetching, and optimistic updates
   - Reduces manual loading/error state management

3. **JWT Storage in localStorage**
   - Trade-off: Less secure than httpOnly cookies, but simpler implementation
   - Benefit: Works seamlessly with Zustand persistence and allows easy token access for API calls

4. **Form Handling with react-hook-form + Zod**
   - Uncontrolled inputs for better performance
   - Zod provides runtime validation with TypeScript type inference

5. **Client-Side Route Protection**
   - Uses `useAuthGuard` hook for protected routes
   - Trade-off: Initial flash possible before redirect; could be improved with middleware

### UI/UX Decisions

1. **shadcn/ui Components**
   - Copy-paste component library allows full customization
   - Consistent design system with accessible components out of the box

2. **Dark/Light Theme Support**
   - Uses next-themes with system preference detection
   - Persists user preference across sessions

3. **Mobile-First Responsive Design**
   - All components designed for mobile first, then scaled up
   - Ensures good UX across all device sizes

---

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
