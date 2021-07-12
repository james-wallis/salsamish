import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import Layout from '../components/Layout'

import theme from '../theme'

const minifiedLayoutRoutes = ['/venue-tour'];

function MyApp({ Component, pageProps, router }: AppProps) {
  const { route } = router;
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: false,
          initialColorMode: 'dark',
        }}
      >
        <Layout minified={minifiedLayoutRoutes.includes(route)}>
          <Component {...pageProps} />
        </Layout>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
