import { useCallback } from "react";
import cn from "classnames";
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
      <h2 className={st.title}>Converter</h2>
      {/* <hr className={cn(st.separator, st.separatorCompact)} /> */}
      <div className={st.inputWrapper}>
        <CurrencyList
          onActivate={from.set}
          disabled={from.disabledMap}
          activeCurrency={from.currency}
          disableMethod="disable"
          showAmount
        />
        <ExchangeInput
          currency={from.currency}
          pair={to.currency}
          value={from.val}
          onChange={from.onChange}
          negative
        />
      </div>
      <div className={st.separatorWrapper}>
        <hr className={st.separator} />
        <span className={st.separatorLabel}>exchange to</span>
      </div>
      <div className={st.inputWrapper}>
        <CurrencyList onActivate={to.set} disabled={to.disabledMap} />
        <ExchangeInput
          currency={to.currency}
          pair={from.currency}
          value={to.val}
          onChange={to.onChange}
        />
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
