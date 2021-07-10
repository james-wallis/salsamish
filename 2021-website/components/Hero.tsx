import NextLink from 'next/link'
import { Flex, Heading, Image, Text, Link } from '@chakra-ui/react'
import HeadlineEmployees from './HeadlineEmployees'
import HeadlineGenres from './HeadlineGenres'
import SocialIcons from './SocialIcons'

const headlineEmployees = [
  { name: 'Charlotte', type: 'Salsa' },
  { name: 'Mish', type: 'Bachata' },
  { name: 'Julian', type: 'Salsa & Bachata DJ' },
  { name: 'Salima', type: 'Kizomba' },
  { name: 'Merville', type: 'Kizomba DJ' },
]

export const Hero = ({ title }: { title: string }) => (
  <Flex alignItems="center" flexDirection="column" maxW="1280px" marginBottom="24">
    <Image src="/salsamish.png" alt="Salsamish Logo" maxW="80vw" />
    <HeadlineGenres />
    <Text textTransform="uppercase" fontSize="xl" paddingTop="2">Greenwood Park, AL2 3HW</Text>
    <SocialIcons />
    <Heading paddingTop="20" fontSize="2xl" textTransform="uppercase" fontWeight="normal">Next event: Friday 23rd July 2021</Heading>
    <Image src="/test-employees.png" alt="Disco lights" width="100vw" paddingY="4" paddingTop="6" height="80" objectFit="cover" />
    <HeadlineEmployees employees={headlineEmployees} />
    <NextLink href="/">
      <Link marginTop="16" fontWeight="semibold" fontSize="xl" color="green.200">Please read the parking guidelines before you arrive.</Link>
    </NextLink>
  </Flex>
)
