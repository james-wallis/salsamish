import { Flex, Link } from '@chakra-ui/react'
import SocialIcons from './SocialIcons'

const links = [
  {
    name: 'Call +44(0)7832 359209',
    href: 'tel:+447832359209',
  },
  {
    name: 'Email mish@salsamish.co.uk',
    href: 'mailto:mish@salsamish.co.uk',
  },
]

const Footer = () => (
  <Flex as="footer" paddingY="12" flexDir="column" alignItems="center">
    <SocialIcons />
    {
      links.map(({ name, href }) => (
        <Link 
          key={name}
          href={href}
          fontSize={{ base: "lg", md: "xl" }}
          marginY={{ base: '1', md: '2' }}
          _hover={{
            textDecoration: 'none',
            color: 'green.200',
          }}
        >
          {name}
        </Link>
      ))
    }
    <Link
      isExternal
      href="https://wallis.dev"
      marginTop="2"
      color="gray.300"
      _hover={{
        textDecoration: 'none',
        color: 'green.200',
      }}
    >
      Created by James
    </Link>
  </Flex>
)

export default Footer;
