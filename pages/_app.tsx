import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { FetchProvider } from "../providers/index.js";

export default function App({ Component, pageProps }: any) {
  return (
    <FetchProvider>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <Head>
          <title>SnapTok - Tiktok Downloader Free</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <Component {...pageProps} />
      </MantineProvider>
    </FetchProvider>
  );
}
