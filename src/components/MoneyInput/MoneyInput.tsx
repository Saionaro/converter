import { useCallback, KeyboardEvent, useRef } from "react";
import cn from "classnames";
import { Currency } from "src/common-types";
import { formatters } from "src/utils/format";
import { isZero } from "src/utils/convert";

import { toExport, allowedSymbos, BACKSPACE, DOT } from "./utils";
import st from "./MoneyInput.module.css";

interface Props {
  value: string;
  currency: Currency;
  onChange: (val: string) => void;
  disabled?: boolean;
  negative?: boolean;
}

const MAX_LEN = 25;

const noop = (smth: unknown) => smth;

export function MoneyInput({
  value,
  currency,
  negative,
  disabled,
  onChange,
}: Props) {
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

  const handleClick = useCallback(() => {
    inputRef?.current?.focus();
  }, [inputRef]);

  return (
    <div className={st.root} onClick={handleClick} role="button">
      <input
        className={st.input}
        value={value}
        ref={inputRef}
        onKeyUp={handleChange}
        maxLength={MAX_LEN}
        disabled={disabled}
        type="number"
        inputMode="decimal"
        onChange={noop}
      />
      <h2 className={st.currency}>{currency}</h2>
      {getDisplay(value, currency, Boolean(negative))}
    </div>
  );
}

function getDisplay(value: string, currency: Currency, negative: boolean) {
  const val = formatters[currency](value);
  const originalParts = value.split(".");
  const formattedParts = val.split(".");
  const decimal = originalParts[1]?.split("") ?? [];
  const formattedDecimal = formattedParts[1].split("");
  const letters = formattedParts[0].split("");
  const hasSmth = !isZero(value);
  const hasDecimal = originalParts.length > 1;

  return (
    <div className={st.view}>
      {hasSmth && <span>{negative ? "-" : "+"}</span>}
      {letters.map((letter, index) => {
        const last = !hasDecimal && index === letters.length - 1;
        const active = (hasSmth && last) || (!hasSmth && index === 0);

        return (
          <span
            key={index}
            className={cn({
              [st.active]: active,
              [st.inactive]: !hasSmth && index !== 0,
            })}
          >
            {letter}
          </span>
        );
      })}
      <span
        className={cn({
          [st.inactive]: !hasDecimal,
          [st.active]: hasDecimal && !decimal[0],
        })}
      >
        .
      </span>
      <span
        className={cn({
          [st.inactive]: !decimal[0],
          [st.active]: decimal[0] && !decimal[1],
        })}
      >
        {formattedDecimal[0]}
      </span>
      <span
        className={cn({
          [st.inactive]: !decimal[1],
          [st.active]: decimal[1],
        })}
      >
        {formattedDecimal[1]}
      </span>
    </div>
  );
}
