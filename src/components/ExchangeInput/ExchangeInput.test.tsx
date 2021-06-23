import React from "react";
import { render } from "@testing-library/react";
import { Wrapper } from "src/store";
import { ExchangeInput } from "./ExchangeInput";

import "@testing-library/jest-dom/extend-expect";

describe("components/ExchangeInput", () => {
  test("fit snapshot", () => {
    const spy = jest.spyOn(React, "useEffect").mockImplementation();

    const { container } = render(
      <Wrapper>
        <ExchangeInput
          currency="USD"
          pair="GBP"
          value=""
          onChange={jest.fn()}
        />
      </Wrapper>
    );

    expect(container.firstChild).toMatchSnapshot();
    spy.mockRestore();
  });
});
