import { toWallet } from "./wallets";

describe("utils/wallets", () => {
  test("toWallet: empty", () => {
    expect(toWallet("USD", "0")).toEqual({
      currency: "USD",
      amount: "0",
      empty: true,
    });
  });

  test("toWallet: normal", () => {
    expect(toWallet("USD", "50")).toEqual({
      currency: "USD",
      amount: "50",
      empty: false,
    });
  });
});
