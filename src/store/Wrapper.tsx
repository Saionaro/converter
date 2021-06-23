import React, { ReactNode } from "react";

import { RatesProvider } from "./rates";
import { WalletsProvider } from "./wallets";

interface Props {
  children: ReactNode;
}

export function Wrapper({ children }: Props) {
  return (
    <RatesProvider>
      <WalletsProvider>{children}</WalletsProvider>
    </RatesProvider>
  );
}
