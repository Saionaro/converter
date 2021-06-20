import { useCallback, KeyboardEvent, useRef } from "react";
import cn from "classnames";
import { Currency } from "src/common-types";
import { formatters } from "src/utils/format";

import { toExport, allowedSymbos, BACKSPACE, DOT } from "./utils";
import st from "./MoneyInput.module.css";

interface Props {
  value: string;
  currency: Currency;
  onChange: (val: string) => void;
}

const MAX_LEN = 25;

export function MoneyInput({ value, currency, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = useCallback(
    ({ key }: KeyboardEvent) => {
      let res: null | string = null;
      if (key === BACKSPACE) {
        res = value.slice(0, -1);
      } else if (key in allowedSymbos || key === DOT) {
        res = value + key;
      }
      if (res !== null) {
        onChange(toExport(res));
      }
    },
    [value, onChange]
  );

  return (
    <div className={st.root} onClick={() => inputRef?.current?.focus()}>
      {getDisplay(value, currency)}
      <input
        className={st.input}
        value={value}
        ref={inputRef}
        onKeyUp={handleChange}
        maxLength={MAX_LEN}
        readOnly
      />
    </div>
  );
}

function getDisplay(value: string, currency: Currency) {
  const val = formatters[currency](value);
  const originalParts = value.split(".");
  const formattedParts = val.split(".");
  const decimal = originalParts[1]?.split("") ?? [];
  const formattedDecimal = formattedParts[1].split("");

  const hasDecimal = originalParts.length > 1;

  return (
    <div className={st.view}>
      <span>{formattedParts[0]}</span>
      <span className={cn(!hasDecimal && st.inactive)}>.</span>
      <span className={cn(!decimal[0] && st.inactive)}>
        {formattedDecimal[0]}
      </span>
      <span className={cn(!decimal[1] && st.inactive)}>
        {formattedDecimal[1]}
      </span>
    </div>
  );
}
