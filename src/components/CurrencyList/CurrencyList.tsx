import { useStoreon } from "storeon/react";
import { CURRENCIES, Currency } from "src/constants/currencies";
import { WalletsStore } from "src/store/wallets";

import { CurrencyButton } from "./CurrencyButton";
import st from "./CurrencyList.module.css";
import { useCallback } from "react";

interface Props {
  onActivate: (val: Currency) => void;
  disabled: Partial<Record<Currency, boolean>>;
  activeCurrency?: Currency;
  disableMethod?: "hide" | "disable";
  showAmount?: boolean;
}

export function CurrencyList({
  onActivate,
  disabled,
  showAmount,
  activeCurrency,
  disableMethod = "hide",
}: Props) {
  const { wallets } = useStoreon<WalletsStore>("wallets");
  const handleClick = useCallback(
    (cur: Currency) => onActivate(cur),
    [onActivate]
  );

  return (
    <div className={st.root}>
      <h3 className={st.variants}>Wallets</h3>
      <ul className={st.list}>
        {CURRENCIES.map((cur) => {
          if (disabled[cur] && disableMethod === "hide") return null;
          return (
            <li key={cur} className={st.item}>
              <CurrencyButton
                currency={cur}
                onClick={handleClick}
                active={activeCurrency === cur}
                disabled={disabled[cur] && disableMethod === "disable"}
                amount={showAmount ? wallets[cur].amount : ""}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
