import Head from "next/head";
import { Converter } from "components/Converter";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Converter />
      </main>
    </>
  );
}
