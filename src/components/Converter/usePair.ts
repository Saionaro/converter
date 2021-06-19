import { useCallback, useEffect, useState } from "react";
import currencyjs from "currency.js";
import { useStoreon } from "storeon/react";
import { WalletsStore } from "src/store/wallets";
import { RatesStore } from "src/store/rates";
import { Currency } from "src/constants/currencies";
import { convert } from "src/utils/convert";

export function usePair() {
  const [from, setFrom] = useState<Currency>("USD");
  const [to, setTo] = useState<Currency>("EUR");
  const { wallets, rates } = useStoreon<WalletsStore & RatesStore>(
    "wallets",
    "rates"
  );

  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");

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
    handleFromChange(fromVal);
  }, [rates[to]]);

  return [
    { currency: from, val: fromVal, set: setFrom, onChange: handleFromChange },
    { currency: to, val: toVal, set: setTo, onChange: handleToChange },
  ];
}
