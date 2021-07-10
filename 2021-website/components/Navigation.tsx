import NextLink from 'next/link'
import { Flex, Text, Link } from "@chakra-ui/react"

const links = ['Home', 'FAQs', 'Parking', 'Venue Tour', 'Calendar', 'About', 'Contact', 'Call +44(0)7832 359209']

const Navigation = () => (
  <Flex textTransform="uppercase" listStyleType="none" flexDir="row" fontSize="lg" width="100vw" justifyContent="center" marginBottom="12">
    {links.map((link, i) => (
       <NextLink key={link} href="/">
        <Link paddingX="6" paddingY="4" marginTop="2" fontWeight={i === links.length -1 ? "medium" : "normal"} color={i === links.length -1 ? "green.200" : "white"} isExternal={i === links.length -1}>{link}</Link>
      </NextLink>
    ))}
  </Flex>
)

export default Navigation
