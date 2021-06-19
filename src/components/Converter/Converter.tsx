import { useStoreon } from "storeon/react";

export function Converter() {
  const { rates } = useStoreon("rates");

  return (
    <div>
      {Object.keys(rates).map((key) => (
        <div key={key}>{rates[key]}</div>
      ))}
    </div>
  );
}
