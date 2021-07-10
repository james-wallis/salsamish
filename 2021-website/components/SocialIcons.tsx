import { Flex, Link } from '@chakra-ui/react'
import { FaFacebookSquare, FaTwitter } from 'react-icons/fa'
import { GrInstagram } from 'react-icons/gr'

const socials = [
  {
    Icon: FaFacebookSquare,
    href: 'https://www.facebook.com/SalsaMish',
  },
  {
    Icon: GrInstagram,
    href: 'https://www.instagram.com/salsamish',
  },
  {
    Icon: FaTwitter,
    href: 'https://twitter.com/salsamish',
  },
  {
    text: '👋',
    href: 'https://www.clubhouse.com/club/salsa-mish'
  }
]

const SocialIcons = () => (
  <Flex marginTop="2" justifyContent="center" alignItems="center">
    {
      socials.map(({ Icon, href, text }) => (
        <Link
          key={href}
          isExternal
          href={href}
          px={2}
          pl={Icon ? 2 : 1}
          fontSize="3xl"
          _hover={{
            color: 'green.200'
          }}
        >
          {Icon ? <Icon /> : text}
        </Link>
      ))
    }
  </Flex>
)

export default SocialIcons