import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { CurrencyList } from "./CurrencyList";

describe("components/CurrencyList", () => {
  test("fit snapshot", () => {
    const { container } = render(
      <CurrencyList onActivate={jest.fn()} disabled={{}} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("disableMethod: hides extra items", () => {
    const { container } = render(
      <CurrencyList
        onActivate={jest.fn()}
        disabled={{ USD: true }}
        disableMethod="hide"
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("invokes callback with currency id", () => {
    const mockCallback = jest.fn();
    const { getByText } = render(
      <CurrencyList onActivate={mockCallback} disabled={{}} />
    );

    const usdButton = getByText("USD");
    fireEvent.click(usdButton);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith("USD");
  });
});
