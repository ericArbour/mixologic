import { useState } from 'react';
import { AppProps } from 'next/app';
import Error from 'next/error';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Header } from '../components';

import './_app.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Welcome to ui!</title>
      </Head>
      {pageProps.statusCode || !pageProps.dehydratedState?.queries?.length ? (
        <Error
          statusCode={pageProps.statusCode ?? 500}
          title="Error fetching data"
        />
      ) : (
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ReactQueryDevtools />
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-screen overflow-hidden relative">
              <Header links={[]} />
              <main className="container mx-auto px-4 py-4">
                <Component {...pageProps} />
              </main>
            </div>
          </Hydrate>
        </QueryClientProvider>
      )}
    </>
  );
}

export default CustomApp;
