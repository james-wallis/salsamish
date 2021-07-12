import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react'
import { getTourURLs } from '../lib/tour-utils';
import { NextSeo } from 'next-seo'

const title = 'Venue Tour'
const description = 'Experience Salsa Mish as if you were there!'

const Tour = () => {
  const { indexHtml: url, favicon, manifest, socialThumbnail, browserConfig, miscDir } = getTourURLs();

  const windowSizeChanged = () => {
    if (typeof window !== 'undefined') {
      const nav = document.getElementById('navigation');
      const navHeight = nav ? nav.offsetHeight : 0;
      if (navHeight !== 0 && navHeight !== window.innerHeight) {
        setIframeHeight(`${window.innerHeight - navHeight}px`);
      }
    }
  }

  const [iframeHeight, setIframeHeight] = useState('100vh');
  useEffect(() => {
    window.addEventListener('resize', windowSizeChanged);
    windowSizeChanged();
    return () => {
      window.removeEventListener('resize', windowSizeChanged)
    }
  }, [])

  return (
    <Box>
      <Head>
        <link rel="shortcut icon" href={favicon} />
        <link rel="icon" sizes="48x48 32x32 16x16" href={favicon} />
        <link rel="apple-touch-icon" type="image/png" sizes="180x180" href={`${miscDir}/icon180.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${miscDir}/icon16.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${miscDir}/icon32.png`} />
        <link rel="icon" type="image/png" sizes="192x192" href={`${miscDir}/icon192.png`} />
        <link rel="manifest" href={manifest} />
        <meta name="msapplication-TileColor" content="#333333" />
        <meta name="msapplication-config" content={browserConfig} />
      </Head>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url,
          description,
          site_name: 'The VECentre',
          images: [
            {
              url: socialThumbnail,
              width: 1200,
              height: 630,
              alt: 'Tour Icon',
            },
          ],
        }}
      />
      {/* https://beta.3dvista.com/en/wiki/how-to-customize-the-url-of-your-tours-to-your-own-domain/ */}
      <Box h={iframeHeight} w="100vw">
        <iframe
            width="100%"
            height="100%"
            src={url}
            scrolling="auto"
            frameBorder="0"
            allowFullScreen
            allow="fullscreen; accelerometer; gyroscope; magnetometer; vr"
        />
      </Box>
    </Box>
  )
}

export default Tour
