import React, {
  createContext,
  ReactNode,
  useMemo,
  useCallback,
  useState,
} from "react";
import { Currency, Wallet, Transaction } from "src/common-types";
import { CURRENCIES } from "src/constants/currencies";
import { toWallet } from "src/utils/wallets";
import { commitTransaction } from "src/utils/transaction";

export type WalletsMap = Record<Currency, Wallet>;

export interface WalletsStore {
  wallets: WalletsMap;
  error?: string;
}

export interface WalletsActions {
  doTransaction: (pair: Transaction) => boolean;
}

const initialState = CURRENCIES.reduce((acc, cur: Currency, index) => {
  const amount = index % 2 ? "2500" : "1500";
  acc[cur] = toWallet(cur, amount);
  return acc;
}, {} as WalletsMap);

export const WalletsContext = createContext<WalletsStore & WalletsActions>({
  wallets: initialState,
  doTransaction: () => true,
});

type Props = { children: ReactNode };

export function WalletsProvider({ children }: Props) {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState<string | undefined>();
  const doTransaction = useCallback(
    (pair: Transaction) => {
      try {
        const dataPiece = commitTransaction(pair, state);
        setState({ ...state, ...dataPiece });
        return true;
      } catch (e) {
        setError(e);
        return false;
      }
    },
    [state]
  );

  const value = useMemo(
    () => ({ wallets: state, error, doTransaction }),
    [state, error, doTransaction]
  );

  return (
    <WalletsContext.Provider value={value}>{children}</WalletsContext.Provider>
  );
}
