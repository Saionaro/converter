import { useCallback, useEffect, useMemo, useState } from "react";
import currencyjs from "currency.js";
import { useWallets, useRates } from "src/store";
import { CURRENCIES, Currency } from "src/constants/currencies";
import { convert } from "src/utils/convert";

type DisabledMap = Partial<Record<Currency, true>>;

interface PairMember {
  currency: Currency;
  val: string;
  set: (cur: Currency) => void;
  onChange: (val: string) => void;
  disabledMap: DisabledMap;
}

export function usePair(): [PairMember, PairMember] {
  const [from, setFrom] = useState<Currency>(CURRENCIES[0]);
  const [to, setTo] = useState<Currency>(CURRENCIES[1]);

  const { rates } = useRates();
  const { wallets } = useWallets();

  const [fromVal, setFromVal] = useState("0");
  const [toVal, setToVal] = useState("0");

  const handleFromChange = useCallback(
    (val: string) => {
      const totalFrom = wallets[from].amount;
      let amount = val;

      const diff = currencyjs(totalFrom).subtract(val);
      if (diff.value <= 0) amount = totalFrom;

      setFromVal(amount);
      setToVal(convert({ from, to, amount, rates }));
    },
    [from, to, rates, wallets]
  );
  const handleToChange = useCallback(
    (val: string) => {
      const totalFrom = wallets[from].amount;
      let amount = val;
      let newFromValue = convert({ from: to, to: from, amount, rates });

      const diff = currencyjs(totalFrom).subtract(newFromValue);
      if (diff.value <= 0) {
        amount = convert({ from, to, amount: totalFrom, rates });
        newFromValue = totalFrom;
      }

      setToVal(amount);
      setFromVal(newFromValue);
    },
    [from, to, rates, wallets]
  );

  useEffect(() => {
    handleToChange(toVal);
  }, [wallets[from].currency]);

  useEffect(() => {
    handleFromChange(fromVal);
  }, [rates[to]]);

  const fromDisabled = useMemo(() => {
    const result: DisabledMap = {};

    result[from] = true;

    for (const cur of CURRENCIES) {
      if (wallets[cur].empty) {
        result[cur] = true;
      }
    }

    return result;
  }, [from, wallets]);
  const toDisabled = useMemo(() => {
    const result: DisabledMap = {};
    result[to] = true;
    result[from] = true;
    return result;
  }, [to, from]);

  const handleFromSet = useCallback(
    (cur: Currency) => {
      if (cur === to) setTo(from);
      setFrom(cur);
    },
    [setFrom, setTo, from, to]
  );

  return [
    {
      currency: from,
      val: fromVal,
      set: handleFromSet,
      onChange: handleFromChange,
      disabledMap: fromDisabled,
    },
    {
      currency: to,
      val: toVal,
      set: setTo,
      onChange: handleToChange,
      disabledMap: toDisabled,
    },
  ];
}
