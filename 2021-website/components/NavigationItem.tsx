import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

interface IProps {
  name: string
  href: string
  type?: string
  mobileOnly?: boolean
}

const NavigationItem = ({ name, href, type, mobileOnly }: IProps) => (
  <NextLink href={href} passHref={type === 'call'}>
    <Link 
      paddingX={{ base: "1", lg: "2" }}
      paddingY="1"
      marginY={{ base: "2", md: "0" }}
      marginX={{ base: "2", md: "4" }}
      fontWeight={type === 'call' ? "medium" : "normal"} 
      color={type === 'call' ? "green.200" : "white"}
      display={{
        base: "block",
        md: (mobileOnly) ? "none" : "inline",
      }}
      textAlign="center"
      _hover={{
        textDecoration: 'none',
      }}
    >
      {name}
    </Link>
  </NextLink>
)

export default NavigationItem
