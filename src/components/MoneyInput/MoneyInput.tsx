import { useCallback, KeyboardEvent } from "react";
import cn from "classnames";
import { Currency } from "src/common-types";
import { formatters } from "src/utils/format";

import st from "./MoneyInput.module.css";

interface Props {
  value: string;
  currency: Currency;
  onChange: (val: string) => void;
}

const MAX_LEN = 25;

const allowedSymbos = {
  "0": true,
  "1": true,
  "2": true,
  "3": true,
  "4": true,
  "5": true,
  "6": true,
  "7": true,
  "8": true,
  "9": true,
} as const;
const AFTER_DOT_LIMIT = 2;
const DOT = ".";
const BACKSPACE = "Backspace";

function toExport(value: string): string {
  let cleanRes = "";
  let afterDotCount = 0;
  let hasDot = false;

  for (const symbol of value) {
    if (symbol in allowedSymbos) {
      cleanRes += symbol;
    }
    if (symbol === DOT && !hasDot) {
      cleanRes += symbol;
      hasDot = true;
    }
    if (hasDot) afterDotCount++;
    if (afterDotCount > AFTER_DOT_LIMIT) break;
  }

  return cleanRes;
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

export function MoneyInput({ value, currency, onChange }: Props) {
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
    [value]
  );

  return (
    <div className={st.root}>
      {getDisplay(value, currency)}
      <input
        className={st.input}
        value={value}
        onKeyUp={handleChange}
        maxLength={MAX_LEN}
        readOnly
      />
    </div>
  );
}
