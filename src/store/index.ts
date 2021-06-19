import { createStoreon } from "storeon";
import { rates, RatesStore, RatesEvents } from "./rates";
import { wallets, WalletsStore, WalletsEvents } from "./wallets";

type Store = RatesStore & WalletsStore;
type Events = RatesEvents & WalletsEvents;

export const store = createStoreon<Store, Events>([wallets, rates]);
