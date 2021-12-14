import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import tailwindConfig from 'tailwind.config';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" hidden>
        <Head>
          <link
            rel="preconnect"
            href="https://rsms.me"
            crossOrigin="anonymous"
          />
          {/* eslint-disable @next/next/no-sync-scripts -- FIXME: use @twind/next */}
          <script
            type="module"
            src="https://cdn.skypack.dev/pin/twind@v0.9.1-viFlSZPxrIbjfGcPsoOc/min/twind/shim.js"
          ></script>
          <script
            type="twind-config"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(tailwindConfig) }}
          ></script>
        </Head>
        <body className="text-gray-800 bg-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
