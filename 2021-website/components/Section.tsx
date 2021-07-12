import { Box, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
  color?: string
}

const Section = ({ children, color = 'black' }: IProps) => (
  <Flex
    paddingY={{ base: '14', md: '24' }}
    backgroundColor={color}
    width="100vw"
    alignItems="center"
    justifyContent="center" 
    overflowX="hidden"
  >
    <Flex
      maxW="maxSite"
      justifyContent="space-between"
      alignItems="center"
      flexDir={{ base: 'column', md: 'row' }}
      paddingX={{ base: "4", md: "8", xl: "0" }}
      fontSize={{ base: 'md', md: 'lg' }}
    >
      {children}
    </Flex>
  </Flex>
)

export default Section
