import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MealForm } from "./MealForm";

// Mock the useGetCalories hook
const mockMutate = vi.fn();
vi.mock("@/hooks/useCalories", () => ({
  useGetCalories: vi.fn(() => ({
    mutate: mockMutate,
    isPending: false,
  })),
}));

// Import after mocking to get the mocked version
import { useGetCalories } from "@/hooks/useCalories";
const mockUseGetCalories = vi.mocked(useGetCalories);

describe("MealForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseGetCalories.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as unknown as ReturnType<typeof useGetCalories>);
  });

  // Helper to get form elements
  const getDishNameInput = () =>
    screen.getByPlaceholderText(/chicken biryani/i);
  const getServingsInput = () => screen.getByRole("spinbutton"); // number inputs have role spinbutton
  const getSubmitButton = () =>
    screen.getByRole("button", { name: /get calorie info/i });

  describe("Rendering", () => {
    it("renders form with dish name input, servings input, and submit button", () => {
      render(<MealForm />);

      expect(getDishNameInput()).toBeInTheDocument();
      expect(getServingsInput()).toBeInTheDocument();
      expect(getSubmitButton()).toBeInTheDocument();
      expect(screen.getByText("Dish Name")).toBeInTheDocument();
      expect(screen.getByText("Number of Servings")).toBeInTheDocument();
    });

    it("shows correct default values", () => {
      render(<MealForm />);

      expect(getDishNameInput()).toHaveValue("");
      expect(getServingsInput()).toHaveValue(1);
    });
  });

  describe("Validation", () => {
    it("shows error when submitting empty dish name", async () => {
      const user = userEvent.setup();
      render(<MealForm />);

      await user.click(getSubmitButton());

      await waitFor(() => {
        expect(screen.getByText(/dish name is required/i)).toBeInTheDocument();
      });

      expect(mockMutate).not.toHaveBeenCalled();
    });

    it("shows error for dish name exceeding 100 characters", async () => {
      const user = userEvent.setup();
      render(<MealForm />);

      const longName = "a".repeat(101);

      await user.type(getDishNameInput(), longName);
      await user.click(getSubmitButton());

      await waitFor(() => {
        expect(
          screen.getByText(/dish name must be less than 100 characters/i)
        ).toBeInTheDocument();
      });

      expect(mockMutate).not.toHaveBeenCalled();
    });

    it("shows error for invalid characters in dish name", async () => {
      const user = userEvent.setup();
      render(<MealForm />);

      await user.type(getDishNameInput(), "chicken @#$%");
      await user.click(getSubmitButton());

      await waitFor(() => {
        expect(
          screen.getByText(
            /dish name can only contain letters, numbers, spaces, hyphens, commas, and apostrophes/i
          )
        ).toBeInTheDocument();
      });

      expect(mockMutate).not.toHaveBeenCalled();
    });

    describe("Submission", () => {
      it("calls getCalories mutation with form data on valid submit", async () => {
        const user = userEvent.setup();
        render(<MealForm />);

        await user.type(getDishNameInput(), "chicken biryani");
        await user.clear(getServingsInput());
        await user.type(getServingsInput(), "2");
        await user.click(getSubmitButton());

        await waitFor(() => {
          expect(mockMutate).toHaveBeenCalledWith(
            { dish_name: "chicken biryani", servings: 2 },
            expect.objectContaining({ onSuccess: expect.any(Function) })
          );
        });
      });

      it("calls onResult callback after successful submission", async () => {
        const user = userEvent.setup();
        const onResult = vi.fn();

        // Make mutate call the onSuccess callback immediately
        mockMutate.mockImplementation((data, options) => {
          options?.onSuccess?.();
        });

        render(<MealForm onResult={onResult} />);

        await user.type(getDishNameInput(), "salad");
        await user.click(getSubmitButton());

        await waitFor(() => {
          expect(onResult).toHaveBeenCalled();
        });
      });
    });

    describe("UI States", () => {
      it("disables inputs and shows loading spinner when isPending is true", () => {
        mockUseGetCalories.mockReturnValue({
          mutate: mockMutate,
          isPending: true,
        } as unknown as ReturnType<typeof useGetCalories>);

        render(<MealForm />);

        expect(screen.getByPlaceholderText(/chicken biryani/i)).toBeDisabled();
        expect(screen.getByRole("spinbutton")).toBeDisabled();
        expect(screen.getByRole("button")).toBeDisabled();
      });

      it("shows 'Looking up calories...' text during pending state", () => {
        mockUseGetCalories.mockReturnValue({
          mutate: mockMutate,
          isPending: true,
        } as unknown as ReturnType<typeof useGetCalories>);

        render(<MealForm />);

        expect(screen.getByText(/looking up calories/i)).toBeInTheDocument();
      });
    });
  });
});
