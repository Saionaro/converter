import { StoreonModule } from "storeon";
import { Currency, Wallet } from "src/common-types";

type WalletsPartial = Partial<Record<Currency, Wallet>>;

export type WalletsStore = { wallets: WalletsPartial };

export interface WalletsEvents {
  "wallets/set": WalletsPartial;
}

export const wallets: StoreonModule<WalletsStore, WalletsEvents> = (store) => {
  store.on("@init", () => ({}));
  store.on("wallets/set", (oldData, data) => ({
    wallets: { ...oldData.wallets, ...data },
  }));
};
