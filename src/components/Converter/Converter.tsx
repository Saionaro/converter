import React, { useCallback } from "react";
import { useWallets } from "src/store";
import { ExchangeInput } from "src/components/ExchangeInput";
import { CurrencyList } from "src/components/CurrencyList";
import { isZero } from "src/utils/convert";

import { usePair } from "./usePair";
import st from "./Converter.module.css";

interface Props {
  className?: string;
}

export function Converter({ className }: Props) {
  const { wallets, error, doTransaction } = useWallets();
  const [from, to] = usePair();
  const fromWalletEmpty = wallets[from.currency].empty;

  const doExchange = useCallback(() => {
    const isSuccess = doTransaction([
      [from.currency, from.val],
      [to.currency, to.val],
    ]);

    if (isSuccess) from.onChange("0");
  }, [from.currency, to.currency, from.val, to.val]);

  return (
    <div className={[st.root, className].join(" ")}>
      <h2 className={st.title}>Converter</h2>
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
          disabled={fromWalletEmpty}
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
          disabled={fromWalletEmpty}
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
      {Boolean(error) && <p className={st.error}>{error}</p>}
    </div>
  );
}
