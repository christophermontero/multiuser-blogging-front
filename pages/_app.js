import React from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import 'nprogress/nprogress.css';
import '../static/css/styles.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
