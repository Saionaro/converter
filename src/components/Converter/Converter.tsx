import { useCallback } from "react";
import { useStoreon } from "storeon/react";
import { ExchangeInput } from "src/components/ExchangeInput";
import { CurrencyGrid } from "src/components/CurrencyGrid";
import { WalletsEvents, WalletsStore } from "src/store/wallets";

import { usePair } from "./usePair";
import st from "./Converter.module.css";

export function Converter() {
  const { dispatch } = useStoreon<WalletsStore, WalletsEvents>();
  const [from, to] = usePair();

  const doConvert = useCallback(() => {
    dispatch("wallets/transaction", [
      [from.currency, from.val],
      [to.currency, to.val],
    ]);
    from.onChange("0");
  }, [from.currency, to.currency, from.val, to.val]);

  return (
    <div>
      <div className={st.inputWrapper}>
        <ExchangeInput
          currency={from.currency}
          pair={to.currency}
          value={from.val}
          onChange={from.onChange}
        />
        <CurrencyGrid onActivate={from.set} disabled={from.disabledMap} />
      </div>
      <hr />
      <div className={st.inputWrapper}>
        <ExchangeInput
          currency={to.currency}
          pair={from.currency}
          value={to.val}
          onChange={to.onChange}
        />
        <CurrencyGrid onActivate={to.set} disabled={to.disabledMap} />
      </div>
      <button onClick={doConvert} disabled={from.currency === to.currency}>
        Convert
      </button>
    </div>
  );
}
