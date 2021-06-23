import React from "react";
import { render } from "@testing-library/react";
import { MoneyValue } from "./MoneyValue";

import "@testing-library/jest-dom/extend-expect";

describe("components/MoneyValue", () => {
  test("renders a formatted money", () => {
    const { container, getByText } = render(
      <MoneyValue currency="USD">5400</MoneyValue>
    );
    expect(getByText("$5,400.00")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("renders a correct zero", () => {
    const { container, getByText } = render(
      <MoneyValue currency="USD">0</MoneyValue>
    );
    expect(getByText("$0.00")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
