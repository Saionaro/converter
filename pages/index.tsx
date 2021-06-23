import Head from "next/head";
import { Converter } from "src/components/Converter";

import st from "./index.module.css";

export default function Index() {
  return (
    <>
      <Head>
        <title>Converter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Converter className={st.converter} />
      </main>
    </>
  );
}
