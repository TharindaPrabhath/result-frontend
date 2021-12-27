import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@mui/styles";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* font */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600&display=swap"
            rel="stylesheet"
          />

          {/* primary meta tags */}
          <meta name="title" content="G.C.E A/L Island Wide Model Test" />
          <meta
            name="description"
            content="This is the official result site of G.C.E A/L Island Wide Model Test which was held by Sasnaka Sansada-Learnsteer"
          />

          {/* open graph/ fb meta tags */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://results.sasnaka.org/" />
          <meta
            property="og:title"
            content="G.C.E A/L Island Wide Model Test"
          />
          <meta
            property="og:description"
            content="This is the official result site of G.C.E A/L Island Wide Model Test which was held by Sasnaka Sansada-Learnsteer"
          />
          <meta
            property="og:image"
            content="https://results.sasnaka.org/logo/sasnaka-learn-steerApp.png"
          />

          {/* twitter meta tags */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://results.sasnaka.org/" />
          <meta
            property="twitter:title"
            content="G.C.E A/L Island Wide Model Test"
          />
          <meta
            property="twitter:description"
            content="This is the official result site of G.C.E A/L Island Wide Model Test which was held by Sasnaka Sansada-Learnsteer"
          />
          <meta
            property="twitter:image"
            content="https://results.sasnaka.org/logo/sasnaka-learn-steerApp.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// below code block was added to fix the loosing MUI styles error which happens after refreshing the page

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props: any) =>
        sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
