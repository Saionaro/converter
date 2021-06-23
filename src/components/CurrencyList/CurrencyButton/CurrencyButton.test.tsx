import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { CurrencyButton, TEST_ID } from "./CurrencyButton";

describe("components/CurrencyButton", () => {
  test("fit snapshot", () => {
    const { container } = render(
      <CurrencyButton currency="USD" onClick={jest.fn()} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("invokes callback with currency id", () => {
    const mockCallback = jest.fn();
    const { getByTestId } = render(
      <CurrencyButton currency="USD" onClick={mockCallback} />
    );

    const button = getByTestId(TEST_ID);
    fireEvent.click(button);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith("USD");
  });
});
