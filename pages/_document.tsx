import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html className="bg-white text-gray-800" lang="en">
        <Head>
          <link
            rel="preconnect"
            href="https://rsms.me"
            crossOrigin="anonymous"
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
