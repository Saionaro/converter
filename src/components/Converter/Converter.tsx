import { ExchangeInput } from "src/components/ExchangeInput";

import { usePair } from "./usePair";
import st from "./Converter.module.css";

export function Converter() {
  const [from, to] = usePair();

  return (
    <div>
      <ExchangeInput
        currency={from.currency}
        pair={to.currency}
        value={from.val}
        onChange={from.onChange}
      />
      <hr />
      <ExchangeInput
        currency={to.currency}
        pair={from.currency}
        value={to.val}
        onChange={to.onChange}
      />
    </div>
  );
}
