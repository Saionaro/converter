import currencyjs from "currency.js";
import { StoreonModule } from "storeon";
import { Currency, Wallet } from "src/common-types";
import { CURRENCIES } from "src/constants/currencies";

type WalletsMap = Record<Currency, Wallet>;

export type WalletsStore = { wallets: WalletsMap };

function toWallet(cur: Currency, amount: string): Wallet {
  const value = currencyjs(amount);

  return {
    currency: cur,
    empty: value.intValue === 0,
    amount,
  };
}

const initialState = CURRENCIES.reduce((acc, cur: Currency) => {
  const amount = cur === "USD" ? "2500" : "0";
  acc[cur] = toWallet(cur, amount);
  return acc;
}, {} as WalletsMap);

export interface WalletsEvents {
  "wallets/set": Partial<WalletsMap>;
}

export const wallets: StoreonModule<WalletsStore, WalletsEvents> = (store) => {
  store.on("@init", () => ({ wallets: initialState }));
  store.on("wallets/set", (oldData, data) => ({
    wallets: { ...oldData.wallets, ...data },
  }));
};
