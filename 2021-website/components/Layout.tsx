import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

import Navigation from './Navigation'
import Footer from './Footer'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      width="100vw"
      bg="black"
      color="white"
    >
      <Navigation />
      {children}
      <Footer />
    </Flex>
  )
}
