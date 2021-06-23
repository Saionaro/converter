import React, { useCallback } from "react";
import cn from "classnames";
import { Currency } from "src/common-types";
import { formatters } from "src/utils/format";

import st from "./CurrencyButton.module.css";

export const TEST_ID = "currency-button";

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
  const handleClick = useCallback(() => onClick(currency), [currency, onClick]);

  return (
    <button
      onClick={handleClick}
      className={cn(st.root, active && st.active)}
      disabled={disabled}
      data-testid={TEST_ID}
    >
      {currency}
      {!!amount && (
        <span className={st.amount}>{formatters[currency](amount)}</span>
      )}
    </button>
  );
}
