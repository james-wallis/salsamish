import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

import Navigation from './Navigation'
import Footer from './Footer'
import TimedAnnouncementBanner from './banners/TimedAnnouncementBanner'

interface IProps {
  children: ReactNode
  minified?: boolean
  hideNav?: boolean
}

const Layout = ({ children, minified = false, hideNav = false }: IProps) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      width="100vw"
      bg="black"
      color="white"
      marginTop={!hideNav ? { md: 14, lg: 16, xl: 20 } : 0}
    >
      <TimedAnnouncementBanner banner timer={{ start: "2025-04-07", end: "2025-06-14" }} />
      {!hideNav && <Navigation fixed />}
      {children}
      {!minified && <Footer />}
    </Flex>
  )
}

export default Layout
