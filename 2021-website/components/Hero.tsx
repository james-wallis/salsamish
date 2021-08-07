import NextLink from 'next/link'
import { Flex, Heading, Image, Text, Link, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import HeadlineEmployees from './HeadlineEmployees'
import HeadlineGenres from './HeadlineGenres'
import SocialIcons from './SocialIcons'
import { IEventWithEmployees } from '../interfaces/IEvent'
import IHeadlineEmployee from '../interfaces/IHeadlineEmployee'
import { formatDate } from '../lib/event-utils'
import EventAgendaDetails from './EventAgendaDetails'

interface IProps {
  event: IEventWithEmployees
  headlineEmployees: IHeadlineEmployee[]
}

const MotionImage = motion(Image)
const MotionFlex = motion(Flex)

export const Hero = ({ event, headlineEmployees }: IProps) => {
  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      w="100vw"
      maxW="maxSite"
      paddingX={{ base: "4", md: "8", xl: "0" }}
      marginBottom={{ base: "16", md: "24" }}>
      <MotionImage
        src="/salsamish.png"
        alt="Salsamish Logo"
        height={{ base: "16", md: "20" }}
        marginTop={{ base: 20, md: 10, lg: 12 }}
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.5,
          type: 'spring',
          bounce: 0.4
        }}
      />
      <HeadlineGenres />
      <MotionFlex
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        w="100%"
        initial={{
          opacity: 0,
          y: -40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 2.5,
          type: 'easeIn',
          bounce: 0.5,
          duration: 0.6
        }}
      >
        <Text
          textTransform="uppercase"
          fontSize={{ base: "lg", md: "xl" }}
          paddingTop={{ base: "1", md: "2" }}
        >
          Greenwood Park, AL2 3HW
        </Text>
        <SocialIcons />
        <Heading
          paddingTop={{ base: '14', md: '20' }}
          fontSize={{ base: "lg", md: "xl", lg: "2xl"}}
          textTransform="uppercase"
          fontWeight="normal"
          textAlign="center"
          as="h1"
        >
          <Box as="span" display="block">
            Next event:
          </Box>
          <Box as="span" display="block" color="green.200">
            {event.name}
          </Box>
          <Box as="span" display="block">
            {formatDate(event.date.start)}
          </Box>
        </Heading>
        <Text
          fontSize={{ base: "xs", md: "sm" }}
          color="gray.300"
        >
          Details may be subject to change
        </Text>
        <HeadlineEmployees employees={headlineEmployees} />
        <EventAgendaDetails agenda={event.agenda} />
        <NextLink href="/parking">
          <Link
            marginTop={{ base: '10', md: '16' }}
            fontSize={{ base: 'lg', md: 'xl' }}
            color="green.200"
            textAlign="center"
          >
            Please read the{` `}
            <span style={{ textDecoration: '' }}>parking guidelines</span>
            {` `}before you arrive.
            <span style={{ display: 'block', fontWeight: 500, paddingTop: '0.5rem' }}>Visit parking page</span>
          </Link>
        </NextLink>
      </MotionFlex>
    </Flex>
  )
}
