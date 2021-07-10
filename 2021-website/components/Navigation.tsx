import NextLink from 'next/link'
import { Flex, Text, Link } from "@chakra-ui/react"

const links = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'FAQs',
    href: '/faq',
  },
  {
    name: 'Parking',
    href: '/',
  },
  {
    name: 'Venue Tour',
    href: '/',
  },
  {
    name: 'About',
    href: '/',
  },
  {
    name: 'Contact',
    href: '/',
  },
  {
    name: 'Call +44(0)7832 359209',
    type: 'call',
    href: 'tel:+447832359209',
  }
];



const Navigation = () => (
  <Flex textTransform="uppercase" listStyleType="none" flexDir="row" fontSize="lg" width="100vw" justifyContent="center" marginBottom="12" marginTop="2">
    {links.map(({ name, href, type }, i) => (
       <NextLink key={name} href={href} passHref={type === 'call'}>
        <Link 
          paddingX="2"
          paddingY="1"
          marginY="3"
          marginX="4"
          fontWeight={type === 'call' ? "medium" : "normal"} 
          color={type === 'call' ? "green.200" : "white"} 
          _hover={{
            textDecoration: 'none',
            color: 'green.200',
          }}
        >
          {name}
        </Link>
      </NextLink>
    ))}
  </Flex>
)

export default Navigation
