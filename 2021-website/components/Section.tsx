import { Box, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
  color?: string
}

const Section = ({ children, color = 'black' }: IProps) => (
  <Flex paddingY="24" backgroundColor={color} width="100vw" alignItems="center" justifyContent="center">
    <Flex w="1280px" justifyContent="left">
      {children}
    </Flex>
  </Flex>
)

export default Section
