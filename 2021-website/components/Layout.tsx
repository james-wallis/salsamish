import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

import Navigation from './Navigation'
import Footer from './Footer'

interface IProps { 
  children: ReactNode
  minified?: boolean
}

const Layout = ({ children, minified = false }: IProps) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      width="100vw"
      bg="black"
      color="white"
      marginTop={{ md: 14, lg: 16, xl: 20 }}
    >
      <Navigation fixed />
      {children}
      {!minified && <Footer />}
    </Flex>
  )
}

export default Layout
