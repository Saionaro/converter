import { StoreonModule } from "storeon";
import { Currency, RatesMap } from "src/common-types";
import { REFRESH_INTERVAL } from "src/constants/rates";
import { CURRENCIES } from "src/constants/currencies";
import { fetchRates } from "src/api/rates";

export type RatesStore = {
  rates: RatesMap;
  error?: string;
};

export interface RatesEvents {
  "rates/set": RatesMap;
  "rates/setError": string | void;
}

const defaultState = CURRENCIES.reduce((acc, cur: Currency) => {
  acc[cur] = 1;
  return acc;
}, {} as RatesMap);

function syncRates(
  onSucc: (data: RatesMap) => void,
  onError: (err: string) => void
) {
  if (typeof window !== "undefined") {
    fetchRates().then(onSucc).catch(onError);

    setInterval(() => {
      fetchRates().then(onSucc).catch(onError);
    }, REFRESH_INTERVAL);
  }
}

export const rates: StoreonModule<RatesStore, RatesEvents> = (store) => {
  store.on("@init", () => {
    syncRates(
      (data) => store.dispatch("rates/set", data),
      (error) => store.dispatch("rates/setError", error)
    );

    return { rates: defaultState };
  });

  store.on("rates/set", (oldData, data) => ({
    rates: { ...oldData.rates, ...data },
  }));
};
