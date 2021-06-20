import currencyjs from "currency.js";
import { Transaction } from "src/common-types";
import { WalletsMap } from "src/store/wallets";
import { toWallet } from "./wallets";

export function commitTransaction(
  transaction: Transaction,
  wallets: WalletsMap
): Partial<WalletsMap> {
  const [fromCur, fromAmount] = transaction[0];
  const [toCur, toAmount] = transaction[1];
  const fromAmount$ = currencyjs(wallets[fromCur].amount, {
    symbol: "",
    separator: "",
  });
  const toAmount$ = currencyjs(wallets[toCur].amount, {
    symbol: "",
    separator: "",
  });

  const newFromAmount$ = fromAmount$.subtract(fromAmount);

  if (newFromAmount$.value < 0) {
    throw new Error("Not enough money");
  }

  const newToAmount = toAmount$.add(toAmount);

  return {
    [fromCur]: toWallet(fromCur, newFromAmount$.format()),
    [toCur]: toWallet(toCur, newToAmount.format()),
  };
}
