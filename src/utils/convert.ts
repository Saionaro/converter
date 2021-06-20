import currencyjs from "currency.js";
import { Currency, RatesMap } from "src/common-types";

interface Params {
  from: Currency;
  to: Currency;
  amount: string;
  rates: RatesMap;
}

export function convert({ from, to, amount, rates }: Params): string {
  const tmp = currencyjs(amount, { symbol: "", separator: "" })
    .divide(rates[from])
    .multiply(rates[to])
    .format();

  let toCut = undefined;

  if (tmp[tmp.length - 1] === "0") {
    toCut = -1;
    if (tmp[tmp.length - 2] === "0") toCut -= 2;
  }

  return tmp.slice(0, toCut);
}

export function isZero(val: string): boolean {
  return currencyjs(val).value === 0;
}
