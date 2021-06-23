import { useContext } from "react";
import { RatesContext } from "./rates";
import { WalletsContext } from "./wallets";

export function useRates() {
  return useContext(RatesContext);
}

export function useWallets() {
  return useContext(WalletsContext);
}

export { Wrapper } from "./Wrapper";
