import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'nprogress/nprogress.css';
import '../static/css/styles.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
