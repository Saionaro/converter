import currencyjs from "currency.js";
import { Currency, Wallet } from "src/common-types";

export function toWallet(cur: Currency, amount: string): Wallet {
  const value = currencyjs(amount);

  return {
    currency: cur,
    empty: value.intValue === 0,
    amount,
  };
}
