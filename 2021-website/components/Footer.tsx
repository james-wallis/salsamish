import { Flex, Text } from '@chakra-ui/react'
import SocialIcons from './SocialIcons'

const Footer = () => (
  <Flex as="footer" paddingY="12" flexDir="column">
    <Text>
      This is a footer
    </Text>
    <SocialIcons />
  </Flex>
)

export default Footer;
