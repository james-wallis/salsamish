import { Flex } from '@chakra-ui/react'

export const Footer = ({ children }: { children: JSX.Element }) => (
  <Flex as="footer" py="8rem">
    {children}
  </Flex>
)
