import { toWallet } from "src/utils/wallets";

import { commitTransaction } from "./transaction";

describe("utils/transaction", () => {
  test("commitTransaction: not enough money", () => {
    const wallets = {
      EUR: toWallet("EUR", "140"),
      GBP: toWallet("GBP", "140"),
      USD: toWallet("USD", "0"),
    };

    expect(() =>
      commitTransaction(
        [
          ["EUR", "500"],
          ["GBP", "450"],
        ],
        wallets
      )
    ).toThrowError("Not enough money");
  });

  test("commitTransaction: success", () => {
    const wallets = {
      EUR: toWallet("EUR", "500"),
      GBP: toWallet("GBP", "500"),
      USD: toWallet("USD", "0"),
    };

    const newWallets = commitTransaction(
      [
        ["EUR", "500"],
        ["GBP", "450"],
      ],
      wallets
    );

    expect(newWallets).toHaveProperty("EUR.amount", "0.00");
    expect(newWallets).toHaveProperty("GBP.amount", "950.00");
  });
});
