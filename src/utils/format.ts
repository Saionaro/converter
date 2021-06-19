import currencyjs from "currency.js";
import { CURRENCIES, Currency, Signs } from "src/constants/currencies";

export const formatters = CURRENCIES.reduce((acc, cur) => {
  acc[cur] = (val: string) => currencyjs(val, { symbol: Signs[cur] }).format();
  return acc;
}, {} as Record<Currency, (val: string) => string>);
