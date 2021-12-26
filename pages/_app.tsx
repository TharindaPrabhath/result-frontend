import "../styles/globals.css";

// next
import type { AppProps } from "next/app";

// mui
import { ThemeProvider } from "@mui/material";

import Layout from "../components/Layout";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
