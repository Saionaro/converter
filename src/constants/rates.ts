import { BASE_CURRENCY } from "./currencies";

const { NEXT_PUBLIC_RATES_API_APP_ID } = process.env;
const RATES_API_ENDPOINT = "https://openexchangerates.org/api/latest.json";

export const REFRESH_INTERVAL = 1000 * 10; // 10s
export const RATES_API_URL = [
  RATES_API_ENDPOINT,
  "?app_id=",
  NEXT_PUBLIC_RATES_API_APP_ID,
  "&base=",
  BASE_CURRENCY,
].join("");
