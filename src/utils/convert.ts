import currencyjs from "currency.js";
import { Currency, RatesMap } from "src/common-types";

interface Params {
  from: Currency;
  to: Currency;
  amount: string;
  rates: RatesMap;
}

export function convert({ from, to, amount, rates }: Params): string {
  return currencyjs(amount, { symbol: "", separator: "" })
    .divide(rates[from])
    .multiply(rates[to])
    .format();
}
