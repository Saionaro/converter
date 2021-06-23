import React, { ComponentProps } from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { MoneyInput } from "./MoneyInput";

import "@testing-library/jest-dom/extend-expect";

const mockCallback = jest.fn((x) => x);

const renderInput = (params: ComponentProps<typeof MoneyInput>) => {
  params.value = last(mockCallback.mock.results)?.value ?? "";
  cleanup();
  return render(<MoneyInput {...params} />);
};

function last<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

describe("components/MoneyInput", () => {
  test("fit snapshot renders", () => {
    const { container } = renderInput({
      value: "",
      currency: "USD" as const,
      onChange: jest.fn(),
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  test("no extra decimal while typing in input", () => {
    const params = {
      value: "",
      currency: "USD" as const,
      onChange: mockCallback,
    };
    renderInput(params);

    let input = screen.getByTestId("input");
    fireEvent.keyUp(input, { key: "5" });

    expect(mockCallback).toBeCalledTimes(1);
    expect(last(mockCallback.mock.results).value).toBe("5");

    renderInput(params);
    input = screen.getByTestId("input");
    fireEvent.keyUp(input, { key: "5" });

    expect(mockCallback).toBeCalledTimes(2);
    expect(last(mockCallback.mock.results).value).toBe("55");

    renderInput({ ...params });
    input = screen.getByTestId("input");
    fireEvent.keyUp(input, { key: "." });

    expect(mockCallback).toBeCalledTimes(3);
    expect(mockCallback.mock.results[2].value).toBe("55.");

    renderInput(params);
    input = screen.getByTestId("input");
    fireEvent.keyUp(input, { key: "f" });

    expect(mockCallback).toBeCalledTimes(3);
    expect(mockCallback.mock.results[2].value).toBe("55.");

    renderInput(params);
    input = screen.getByTestId("input");
    fireEvent.keyUp(input, { key: "5" });
    renderInput(params);
    input = screen.getByTestId("input");
    fireEvent.keyUp(input, { key: "5" });
    renderInput(params);
    input = screen.getByTestId("input");
    fireEvent.keyUp(input, { key: "5" });

    renderInput({ ...params });

    expect(last(mockCallback.mock.results).value).toBe("55.55");
  });
});
