import { Currency } from "src/constants/currencies";

export interface Wallet {
  currency: Currency;
  amount: string;
  empty: boolean;
}

export type RatesMap = Record<Currency, number>;

export type { Currency };

export type TransactionComponent = [Currency, string];
export type Transaction = [TransactionComponent, TransactionComponent];
