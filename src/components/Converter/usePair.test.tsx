import React from "react";
import { render, fireEvent, act, screen } from "@testing-library/react";
import { Wrapper } from "src/store";
import { RATES_API_URL } from "src/constants/rates";

import { usePair } from "./usePair";

import "@testing-library/jest-dom/extend-expect";

function Poligon() {
  const [from, to] = usePair();

  return (
    <div>
      <span data-testid="from-cur">{from.currency}</span>
      <span data-testid="to-cur">{to.currency}</span>

      <span data-testid="from-val">{from.val}</span>
      <span data-testid="to-val">{to.val}</span>

      <button data-testid="from-set-bgp" onClick={() => from.set("GBP")} />
      <button data-testid="from-set-eur" onClick={() => from.set("EUR")} />

      <button data-testid="from-change" onClick={() => from.onChange("42.2")} />
      <button data-testid="to-change" onClick={() => to.onChange("142121.2")} />
    </div>
  );
}

async function renderPloigon() {
  await act(async () =>
    render(
      <Wrapper>
        <Poligon />
      </Wrapper>
    )
  );

  const fromCur = screen.getByTestId("from-cur");
  const toCur = screen.getByTestId("to-cur");

  const fromVal = screen.getByTestId("from-val");
  const toVal = screen.getByTestId("to-val");

  const fromSetGbpBtn = screen.getByTestId("from-set-bgp");
  const fromSetEurBtn = screen.getByTestId("from-set-eur");

  const fromChangeBtn = screen.getByTestId("from-change");
  const toChangeBtn = screen.getByTestId("to-change");

  return {
    from: {
      cur: fromCur,
      val: fromVal,
      setGbpBtn: fromSetGbpBtn,
      setEurBtn: fromSetEurBtn,
      changeBtn: fromChangeBtn,
    },
    to: { cur: toCur, val: toVal, changeBtn: toChangeBtn },
  };
}

describe("components/Converter/usePair", () => {
  test("initial state and api call", async () => {
    global.fetch = jest.fn().mockImplementation(async () => ({
      json: async () => ({ rates: { USD: 1, EUR: 1.2, GBP: 1.5 } }),
    }));

    const { from, to } = await renderPloigon();

    expect(global.fetch).toBeCalledWith(RATES_API_URL);

    expect(from.cur).toHaveTextContent("USD");
    expect(to.cur).toHaveTextContent("EUR");
    expect(from.val).toHaveTextContent("0");
    expect(to.val).toHaveTextContent("0");
  });

  test("basic changing currency", async () => {
    const { from, to } = await renderPloigon();

    act(() => {
      fireEvent.click(from.setGbpBtn);
    });

    expect(from.cur).toHaveTextContent("GBP");
    expect(to.cur).toHaveTextContent("EUR");
    expect(from.val).toHaveTextContent("0");
    expect(to.val).toHaveTextContent("0");
  });

  test("changing currency with switching", async () => {
    const { from, to } = await renderPloigon();

    act(() => {
      fireEvent.click(from.setEurBtn);
    });

    expect(from.cur).toHaveTextContent("EUR");
    expect(to.cur).toHaveTextContent("USD");
    expect(from.val).toHaveTextContent("0");
    expect(to.val).toHaveTextContent("0");
  });

  test("forward currency convertation", async () => {
    const { from, to } = await renderPloigon();

    act(() => {
      fireEvent.click(from.changeBtn);
    });

    expect(from.cur).toHaveTextContent("USD");
    expect(to.cur).toHaveTextContent("EUR");
    expect(from.val).toHaveTextContent("42.2");
    expect(to.val).toHaveTextContent("50.64");
  });

  test("forward currency convertation with overflow", async () => {
    const { from, to } = await renderPloigon();

    act(() => {
      fireEvent.click(from.setGbpBtn);
      fireEvent.click(to.changeBtn);
    });

    expect(from.cur).toHaveTextContent("GBP");
    expect(to.cur).toHaveTextContent("EUR");
    expect(from.val).toHaveTextContent("1500");
    expect(to.val).toHaveTextContent("1200");
  });
});
