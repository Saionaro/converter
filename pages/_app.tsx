import type { AppProps } from "next/app";
import { StoreContext } from "storeon/react";
import { store } from "src/store";

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <StoreContext.Provider value={store}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  );
}
