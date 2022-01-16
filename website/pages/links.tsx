import { Flex, Image, Box, Text, Link } from '@chakra-ui/react'
import HeadlineGenres from '../components/HeadlineGenres'
import { FaTwitter, FaFacebookSquare, FaYoutube, FaLinkedin } from 'react-icons/fa'
import { GrInstagram } from 'react-icons/gr'
import { ImLocation } from 'react-icons/im'
import { NextSeo } from 'next-seo'

const links = [
  {
    name: 'Facebook',
    Icon: FaFacebookSquare,
    href: 'https://www.facebook.com/SalsaMish',
  },
  {
    name: 'Instagram',
    Icon: GrInstagram,
    href: 'https://www.instagram.com/salsamish',
  },
  {
    name: 'Twitter',
    Icon: FaTwitter,
    href: 'https://twitter.com/salsamish',
  },
  {
    name: 'Clubhouse',
    textIcon: '👋',
    href: 'https://www.clubhouse.com/club/salsa-mish',
  },
  {
    name: 'Virtual Tour',
    image: '/tour-icon.png',
    href: '/venue-tour',
  },
  {
    name: 'YouTube',
    Icon: FaYoutube,
    href: 'https://www.youtube.com/channel/UCBylZriTHdCCEOmpRTdxbAQ',
  },
  {
    name: 'LinkedIn',
    Icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/mish-yanni-4292126a',
  },
  {
    name: 'Google Maps',
    Icon: ImLocation,
    href: 'https://goo.gl/maps/53MCoy8ebUqQVYc2A',
  },
]

const title = 'Links'

const LinksPage = () => (
  <Box
    backgroundImage="/salsabackdrop-original.png"
    backgroundPosition="top left"
    backgroundSize="cover"
    minH="100vh"
    minW="100vw"
  >
    <NextSeo title={title} openGraph={{ title }} />
    <Flex
      flexDir="column"
      alignItems="center"
      h="100%"
      w="100%"
      minH="100vh"
      minW="100vw"
      backgroundColor="rgba(0, 0, 0, 0.7)"
    >
      <Flex>
        <Image
          src="/salsamish.png"
          alt="Salsamish Logo"
          height={{ base: "14", md: "16" }}
          marginTop={{ base: 8, md: 10, lg: 12 }}
        />
      </Flex>
      <HeadlineGenres animate={false} />
      <Box
        marginTop="2"
        w={{ base: '100%', md: 'auto' }}
        paddingX="10%"
      >
        {
          links.map(({ name, Icon, image, textIcon, href }) => (
            <Link key={name} href={href} _hover={{ textDecoration: 'none' }}>
              <Flex
                flexDir="row"
                marginY={{ base: 2 }}
                justifyContent="flex-start"
                alignItems="center"
                width={{ base: '100%', md: 96 }}
                paddingX={{ base: 4, md: 8 }}
              >
                <Box fontSize={{ base: '3xl', md: '4xl' }}>
                  {Icon && <Icon />}
                  {image && <Image src={image} alt={`${name} logo`} w={{ base: 8, md: 9 }} />}
                  {textIcon && <Text>{textIcon}</Text>}
                </Box>
                <Text
                  fontSize="3xl"
                  paddingLeft="4"
                >
                  {name}
                </Text>
              </Flex>
            </Link>
          ))
        }
      </Box>
    </Flex>
  </Box>
)

export default LinksPage
