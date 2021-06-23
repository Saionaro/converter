import type { AppProps } from "next/app";
import { Wrapper } from "src/store";

import "src/theme.css";
import "src/common-styles.css";

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
}
