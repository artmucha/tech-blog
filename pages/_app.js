
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import theme from 'styles/theme';
import createEmotionCache from 'styles/createEmotionCache';
import GlobalStyles from 'styles/globalStyles';

const clientSideEmotionCache = createEmotionCache();

const ClientApp = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Blog</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ClientApp;