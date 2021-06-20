import cn from "classnames";
import { useCallback } from "react";
import { Currency } from "src/common-types";
import { formatters } from "src/utils/format";

import st from "./CurrencyButton.module.css";

interface Props {
  currency: Currency;
  onClick: (curr: Currency) => void;
  active?: boolean;
  disabled?: boolean;
  amount?: string;
}

export function CurrencyButton({
  currency,
  onClick,
  amount,
  disabled,
  active,
}: Props) {
  const handleClick = useCallback(() => {
    onClick(currency);
  }, [currency, onClick]);

  return (
    <button
      onClick={handleClick}
      className={cn(st.root, active && st.active)}
      disabled={disabled}
    >
      {currency}
      {!!amount && (
        <span className={st.amount}>{formatters[currency](amount)}</span>
      )}
    </button>
  );
}
