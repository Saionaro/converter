import { useCallback } from "react";
import { Currency } from "src/common-types";
import { formatters } from "src/utils/format";

import st from "./CurrencyButton.module.css";

interface Props {
  currency: Currency;
  onClick: (curr: Currency) => void;
  amount?: string;
}

export function CurrencyButton({ currency, onClick, amount }: Props) {
  const handleClick = useCallback(() => {
    onClick(currency);
  }, [currency, onClick]);

  return (
    <button onClick={handleClick} className={st.root}>
      {!!amount && (
        <span className={st.amount}>{formatters[currency](amount)}</span>
      )}
      {currency}
    </button>
  );
}
