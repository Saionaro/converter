import { StoreonModule } from "storeon";
import { Currency } from "src/common-types";
import { REFRESH_INTERVAL } from "src/constants/rates";

type RatesMap = Record<Currency, string>;

export type RatesStore = { rates: RatesMap };

export interface RatesEvents {
  "rates/set": RatesMap;
}

const defaultState: RatesMap = {
  GBP: "0",
  EUR: "0",
  USD: "0",
};

async function fetchRates(callback: (rates: RatesMap) => void): Promise<void> {
  try {
    // await fetch rates
    callback(defaultState);
  } catch (e) {}
}

function syncRates(setter: (data: RatesMap) => void) {
  fetchRates(setter);
  setInterval(() => {
    fetchRates(setter);
  }, REFRESH_INTERVAL);
}

export const rates: StoreonModule<RatesStore, RatesEvents> = (store) => {
  store.on("@init", () => {
    syncRates((data) => store.dispatch("rates/set", data));

    return { rates: defaultState };
  });
  store.on("rates/set", (_, rates) => ({ rates }));
};
