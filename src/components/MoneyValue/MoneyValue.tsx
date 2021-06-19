import { Currency } from "src/common-types";
import { formatters } from "src/utils/format";

import st from "./MoneyValue.module.css";

interface Props {
  currency: Currency;
  children: string;
}

export function MoneyValue({ children, currency }: Props) {
  return <span className={st.root}>{formatters[currency](children)}</span>;
}
