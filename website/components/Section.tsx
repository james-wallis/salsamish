import { Box, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
  color?: string
}

const Section = ({ children, color = 'black' }: IProps) => (
  <Flex
    paddingY={{ base: '20', md: '10' }}
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
      w="100%"
    >
      {children}
    </Flex>
  </Flex>
)

export default Section
