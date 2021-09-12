import { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';

function CustomApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Welcome to ui!</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools />
          <div>
            <header>
              <h1>Mixologic</h1>
            </header>
            <main>
              <Component {...pageProps} />
            </main>
          </div>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default CustomApp;
