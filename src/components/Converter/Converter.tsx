import { useCallback } from "react";
import { useStoreon } from "storeon/react";
import { ExchangeInput } from "src/components/ExchangeInput";
import { CurrencyList } from "src/components/CurrencyList";
import { isZero } from "src/utils/convert";
import { WalletsEvents, WalletsStore } from "src/store/wallets";

import { usePair } from "./usePair";
import st from "./Converter.module.css";

export function Converter() {
  const { dispatch } = useStoreon<WalletsStore, WalletsEvents>();
  const [from, to] = usePair();

  const doExchange = useCallback(() => {
    dispatch("wallets/transaction", [
      [from.currency, from.val],
      [to.currency, to.val],
    ]);
    from.onChange("0");
  }, [from.currency, to.currency, from.val, to.val]);

  return (
    <div className={st.root}>
      <div className={st.inputWrapper}>
        <ExchangeInput
          currency={from.currency}
          pair={to.currency}
          value={from.val}
          onChange={from.onChange}
          negative
        />
        <CurrencyList
          onActivate={from.set}
          disabled={from.disabledMap}
          showAmount
        />
      </div>
      <div className={st.separatorWrapper}>
        <hr className={st.separator} />
        <span className={st.separatorLabel}>exchange to</span>
      </div>
      <div className={st.inputWrapper}>
        <ExchangeInput
          currency={to.currency}
          pair={from.currency}
          value={to.val}
          onChange={to.onChange}
        />
        <CurrencyList onActivate={to.set} disabled={to.disabledMap} />
      </div>
      <button
        className={st.submit}
        onClick={doExchange}
        disabled={isZero(from.val)}
      >
        Exchange
      </button>
    </div>
  );
}
