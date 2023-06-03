import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';
import {TransactionProvider} from '../context/TransactionContext';

function MyApp({ Component, pageProps }) {
  return (
    <TransactionProvider>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </TransactionProvider>
  )
}

export default MyApp
