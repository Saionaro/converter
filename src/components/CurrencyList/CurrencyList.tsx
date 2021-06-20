import { useStoreon } from "storeon/react";
import { CURRENCIES, Currency } from "src/constants/currencies";
import { WalletsStore } from "src/store/wallets";

import { CurrencyButton } from "./CurrencyButton";
import st from "./CurrencyList.module.css";
import { useCallback } from "react";

interface Props {
  onActivate: (val: Currency) => void;
  disabled: Partial<Record<Currency, boolean>>;
  showAmount?: boolean;
}

export function CurrencyList({ onActivate, disabled, showAmount }: Props) {
  const { wallets } = useStoreon<WalletsStore>("wallets");
  const handleClick = useCallback((cur: Currency) => onActivate(cur), []);

  return (
    <ul className={st.root}>
      {CURRENCIES.map((cur) => {
        if (disabled[cur]) return null;
        return (
          <li key={cur} className={st.item}>
            <CurrencyButton
              currency={cur}
              onClick={handleClick}
              amount={showAmount ? wallets[cur].amount : ""}
            />
          </li>
        );
      })}
    </ul>
  );
}
