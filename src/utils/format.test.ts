import { formatters } from "./format";

describe("utils/format", () => {
  test("formatters", () => {
    expect(formatters.USD("5")).toBe("$5.00");
    expect(formatters.GBP("5")).toBe("£5.00");
    expect(formatters.USD("5000")).toBe("$5,000.00");
    expect(formatters.USD("500000")).toBe("$500,000.00");
  });
});
