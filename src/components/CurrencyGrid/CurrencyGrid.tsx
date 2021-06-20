import { CURRENCIES, Currency } from "src/constants/currencies";

import st from "./CurrencyGrid.module.css";

interface Props {
  onActivate: (val: Currency) => void;
  disabled: Partial<Record<Currency, boolean>>;
}

export function CurrencyGrid({ onActivate, disabled }: Props) {
  return (
    <ul className={st.root}>
      {CURRENCIES.map((cur) => (
        <li key={cur}>
          <button onClick={() => onActivate(cur)} disabled={disabled[cur]}>
            {cur}
          </button>
        </li>
      ))}
    </ul>
  );
}
