import { RatesMap } from "src/common-types";
import { RATES_FETCH_ERORR } from "src/constants/errors";
import { CURRENCIES } from "src/constants/currencies";
import { Currency } from "src/common-types";
import { RATES_API_URL } from "src/constants/rates";

interface RawRatesResponse {
  rates: Record<Currency | string, number>;
}

export async function fetchRates(): Promise<RatesMap> {
  try {
    const response = await fetch(RATES_API_URL);
    const data: RawRatesResponse = await response.json();
    const rates: Partial<RatesMap> = {};
    for (const cur of CURRENCIES) {
      rates[cur] = data.rates[cur];
    }

    return rates as RatesMap;
  } catch (e) {
    throw new Error(RATES_FETCH_ERORR);
  }
}
