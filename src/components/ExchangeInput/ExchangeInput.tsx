import { useStoreon } from "storeon/react";
import { Currency } from "src/common-types";
import { WalletsStore } from "src/store/wallets";
import { RatesStore } from "src/store/rates";
import { MoneyValue } from "src/components/MoneyValue";
import { convert } from "src/utils/convert";
import { MoneyInput } from "src/components/MoneyInput";

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
  const { wallets, rates } = useStoreon<WalletsStore & RatesStore>(
    "wallets",
    "rates"
  );

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
          You have{" "}
          <MoneyValue currency={currency}>{currentWallet.amount}</MoneyValue>
        </span>
        <span>
          <MoneyValue currency={currency}>1</MoneyValue>
          {" = "}
          <MoneyValue currency={pair}>{pairCost}</MoneyValue>
        </span>
      </div>
    </div>
  );
}
