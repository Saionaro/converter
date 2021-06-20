const AFTER_DOT_LIMIT = 2;

export const allowedSymbos = {
  "0": true,
  "1": true,
  "2": true,
  "3": true,
  "4": true,
  "5": true,
  "6": true,
  "7": true,
  "8": true,
  "9": true,
} as const;
export const DOT = ".";
export const BACKSPACE = "Backspace";

export function toExport(value: string): string {
  let cleanRes = "";
  let afterDotCount = 0;
  let hasDot = false;

  for (const symbol of value) {
    if (symbol in allowedSymbos) {
      cleanRes += symbol;
    }
    if (symbol === DOT && !hasDot) {
      cleanRes += symbol;
      hasDot = true;
    }
    if (hasDot) afterDotCount++;
    if (afterDotCount > AFTER_DOT_LIMIT) break;
  }

  return cleanRes;
}
