import React from "react";
import { Currency } from "src/common-types";
import { MoneyValue } from "src/components/MoneyValue";
import { convert } from "src/utils/convert";
import { MoneyInput } from "src/components/MoneyInput";
import { useRates, useWallets } from "src/store";

import st from "./ExchangeInput.module.css";

interface Props {
  currency: Currency;
  pair: Currency;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  negative?: boolean;
}

export function ExchangeInput({
  currency,
  pair,
  value,
  onChange,
  negative,
  disabled,
}: Props) {
  const { wallets } = useWallets();
  const { rates } = useRates();
  const currentWallet = wallets[currency];
  const pairCost = convert({ from: currency, to: pair, amount: "1", rates });

  return (
    <div className={st.root}>
      <MoneyInput
        value={value}
        currency={currency}
        onChange={onChange}
        negative={negative}
        disabled={disabled}
      />
      <div className={st.info}>
        <span>
          <span>You have </span>
          <MoneyValue currency={currency}>{currentWallet.amount}</MoneyValue>
        </span>
        <span>
          <MoneyValue currency={currency}>1</MoneyValue>
          <span>{" = "}</span>
          <MoneyValue currency={pair}>{pairCost}</MoneyValue>
        </span>
      </div>
    </div>
  );
}
