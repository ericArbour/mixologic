import { useState } from 'react';
import { AppProps } from 'next/app';
import Error from 'next/error';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Header } from '../components';

import './_app.css';

export default function CustomApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Mixologic</title>
      </Head>
      {pageProps.statusCode ||
      (pageProps.dehydratedState?.queries &&
        !pageProps.dehydratedState.queries.length) ? (
        <Error
          statusCode={pageProps.statusCode ?? 500}
          title={!pageProps.statusCode && 'Error fetching data'}
        />
      ) : (
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ReactQueryDevtools />
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-screen overflow-hidden relative flex flex-col">
              <Header
                links={[
                  { label: 'Categories', pathname: '/categories' },
                  { label: 'Glasses', pathname: '/glasses' },
                ]}
              />
              <main className="flex-grow overflow-auto">
                <div className="container mx-auto p-4 sm:p-8 max-w-3xl flex flex-col">
                  <Component {...pageProps} />
                </div>
              </main>
            </div>
          </Hydrate>
        </QueryClientProvider>
      )}
    </>
  );
}
