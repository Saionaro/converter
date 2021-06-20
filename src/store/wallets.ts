import { StoreonModule } from "storeon";
import { Currency, Wallet, Transaction } from "src/common-types";
import { CURRENCIES } from "src/constants/currencies";
import { toWallet } from "src/utils/wallets";
import { commitTransaction } from "src/utils/transaction";

export type WalletsMap = Record<Currency, Wallet>;

export type WalletsStore = {
  wallets: WalletsMap;
  error?: string;
};

const initialState = CURRENCIES.reduce((acc, cur: Currency, index) => {
  const amount = index % 2 ? "2500" : "1500";
  acc[cur] = toWallet(cur, amount);
  return acc;
}, {} as WalletsMap);

export interface WalletsEvents {
  "wallets/set": Partial<WalletsMap>;
  "wallets/transaction": Transaction;
}

export const wallets: StoreonModule<WalletsStore, WalletsEvents> = (store) => {
  store.on("@init", () => ({ wallets: initialState }));

  store.on("wallets/set", (oldData, data) => ({
    wallets: { ...oldData.wallets, ...data },
  }));

  store.on("wallets/transaction", (oldData, pair) => {
    let dataPiece = {};
    let error;

    try {
      dataPiece = commitTransaction(pair, oldData.wallets);
    } catch (e) {
      error = e;
    }

    return {
      error,
      wallets: {
        ...oldData.wallets,
        ...dataPiece,
      },
    };
  });
};
