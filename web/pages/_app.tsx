import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@common/theme';
import createEmotionCache from '@common/createEmotionCache';
import SeoHead from '@components/core/seo-head';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  footerData?: any;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <link rel="dns-prefetch" href="https://js-eu1.hsforms.net/" />
        <title>{pageProps?.page?.meta?.content?.seo?.title || 'Burdy'}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <SeoHead
          title={pageProps?.page?.meta?.content?.seo?.title}
          description={pageProps?.page?.meta?.content?.seo?.description}
          featured={pageProps?.page?.meta?.content?.seo?.featured?.[0]}
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
