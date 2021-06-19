export const CURRENCIES = ["USD", "EUR", "GBP"] as const;
export const BASE_CURRENCY = "USD";

export type Currency = typeof CURRENCIES[number];

export const Signs: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};
