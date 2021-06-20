import { convert } from "./convert";

const rates = { USD: 1, EUR: 0.85, GBP: 0.75 };

describe("utils/convert", () => {
  test("forward convert", () => {
    expect(convert({ from: "USD", to: "EUR", amount: "50", rates })).toBe(
      "42.5"
    );
  });

  test("backward convert", () => {
    expect(convert({ from: "EUR", to: "USD", amount: "50", rates })).toBe(
      "58.82"
    );
  });

  test("convert through base currency (USD)", () => {
    expect(convert({ from: "EUR", to: "GBP", amount: "50", rates })).toBe(
      "44.12"
    );
  });
});
