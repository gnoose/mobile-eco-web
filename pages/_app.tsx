import React from 'react'
import { AppProps } from 'next/app'

import {DialogProvider} from '../components/ui-kit/dialog/dialog-context';
import '../styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.error) {
    return (
      <ErrorPage
        statusCode={pageProps.error.statusCode}
        message={pageProps.error.message}
      />
    );
  }

  return (
    <>
      <DialogProvider>
        <Component {...pageProps} />
      </DialogProvider>
    </>
  );
}

export default MyApp;