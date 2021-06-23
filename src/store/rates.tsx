import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { Currency, RatesMap } from "src/common-types";
import { REFRESH_INTERVAL } from "src/constants/rates";
import { CURRENCIES } from "src/constants/currencies";
import { fetchRates } from "src/api/rates";

export type RatesStore = {
  rates: RatesMap;
  error?: string;
};

const initialState = CURRENCIES.reduce((acc, cur: Currency) => {
  acc[cur] = 1;
  return acc;
}, {} as RatesMap);

export const RatesContext = createContext<RatesStore>({ rates: initialState });

type Props = { children: ReactNode };

export const RatesProvider = ({ children }: Props) => {
  const [state, setState] = useState<RatesMap>(initialState);
  const [error, setError] = useState<string | undefined>();
  const value = useMemo(() => ({ rates: state, error }), [state, error]);

  useEffect(() => {
    fetchRates().then(setState).catch(setError);

    const refreshInterval = setInterval(() => {
      // fetchRates().then(setState).catch(setError);
    }, REFRESH_INTERVAL);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <RatesContext.Provider value={value}>{children}</RatesContext.Provider>
  );
};
