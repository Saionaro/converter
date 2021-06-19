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
}

export function ExchangeInput({ currency, pair, value, onChange }: Props) {
  const { wallets, rates } = useStoreon<WalletsStore & RatesStore>(
    "wallets",
    "rates"
  );

  const currentWallet = wallets[currency];
  const pairCost = convert({ from: currency, to: pair, amount: "1", rates });

  return (
    <div className={st.root}>
      <h2>{currency}</h2>
      <MoneyInput value={value} currency={currency} onChange={onChange} />
      <div>
        <span>
          You have{" "}
          <MoneyValue currency={currency}>{currentWallet.amount}</MoneyValue>
        </span>
      </div>
      <div>
        <span>
          <MoneyValue currency={currency}>1</MoneyValue>
          {" = "}
          <MoneyValue currency={pair}>{pairCost}</MoneyValue>
        </span>
      </div>
    </div>
  );
}