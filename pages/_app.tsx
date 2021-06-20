import type { AppProps } from "next/app";
import { StoreContext } from "storeon/react";
import { store } from "src/store";

import "src/theme.css";
import "src/common-styles.css";

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <StoreContext.Provider value={store}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  );
}
