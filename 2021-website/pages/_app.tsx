import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import Layout from '../components/Layout'

import theme from '../theme'

const minifiedLayoutRoutes = ['/venue-tour'];

function MyApp({ Component, pageProps, router }: AppProps) {
  const { route } = router;
  const url = `https://salsamish.co.uk${route}`

  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: false,
          initialColorMode: 'dark',
        }}
      >
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
        <DefaultSeo
          titleTemplate="%s - Salsa Mish"
          openGraph={{
              type: 'website',
              locale: 'en_IE',
              url,
              description: 'Salsa Mish - The home of Salsa in Herts. Live Salsa, Bachata and Kizomba every Friday night. Dance, meet people, get fit and above all have fun!',
              site_name: 'James Wallis | wallis.dev',
              images: [],
          }}
          canonical={url}
        />
        <Layout minified={minifiedLayoutRoutes.includes(route)}>
          <Component {...pageProps} />
        </Layout>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
