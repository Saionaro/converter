import Head from "next/head";
import { Converter } from "src/components/Converter";

export default function Index() {
  return (
    <>
      <Head>
        <title>Converter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Converter />
      </main>
    </>
  );
}
