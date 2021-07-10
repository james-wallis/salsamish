import { Flex, Link } from '@chakra-ui/react'
import SocialIcons from './SocialIcons'

const Footer = () => (
  <Flex as="footer" paddingY="12" flexDir="column" alignItems="center">
    <SocialIcons />
    <Link 
      href="tel:+447832359209"
      fontSize="xl"
      marginY="2"
      marginTop="4"
      _hover={{
        textDecoration: 'none',
        color: 'green.200',
      }}
    >
      Call +44(0)7832 359209
    </Link>
    <Link 
      href="mailto:mish@salsamish.co.uk"
      fontSize="xl"
      marginY="2"
      _hover={{
        textDecoration: 'none',
        color: 'green.200',
      }}
    >
      Email mish@salsamish.co.uk
    </Link>
  </Flex>
)

export default Footer;
