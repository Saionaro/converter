import React, { ComponentProps } from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";

import { MoneyInput } from "./MoneyInput";

const mockCallback = jest.fn((x) => x);

const rend = (params: ComponentProps<typeof MoneyInput>) => {
  params.value = last(mockCallback.mock.results)?.value ?? "";
  cleanup();
  render(<MoneyInput {...params} />);
};

function last<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

describe("components/MoneyInput", () => {
  test("no extra decimal", () => {
    const params = {
      value: "",
      currency: "USD" as const,
      onChange: mockCallback,
    };
    rend(params);

    let input = screen.getByTestId("input");
    fireEvent.keyUp(input, { key: "5" });

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(last(mockCallback.mock.results).value).toBe("5");

    rend(params);
    input = screen.getByTestId("input");
    fireEvent.keyUp(input, { key: "5" });

    expect(mockCallback.mock.calls.length).toBe(2);
    expect(last(mockCallback.mock.results).value).toBe("55");

    rend({ ...params });
    input = screen.getByTestId("input");
    fireEvent.keyUp(input, { key: "." });

    expect(mockCallback.mock.calls.length).toBe(3);
    expect(mockCallback.mock.results[2].value).toBe("55.");

    rend(params);
    input = screen.getByTestId("input");
    fireEvent.keyUp(input, { key: "f" });

    expect(mockCallback.mock.calls.length).toBe(3);
    expect(mockCallback.mock.results[2].value).toBe("55.");

    rend(params);
    input = screen.getByTestId("input");
    fireEvent.keyUp(input, { key: "5" });
    rend(params);
    input = screen.getByTestId("input");
    fireEvent.keyUp(input, { key: "5" });
    rend(params);
    input = screen.getByTestId("input");
    fireEvent.keyUp(input, { key: "5" });

    rend({ ...params });

    expect(last(mockCallback.mock.results).value).toBe("55.55");
  });
});
