import { CURRENCIES } from "src/constants/currencies";

export type Currency = typeof CURRENCIES[number];

export interface Wallet {
  currency: Currency;
  amount: string;
}
