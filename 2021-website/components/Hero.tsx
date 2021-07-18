import NextLink from 'next/link'
import { Flex, Heading, Image, Text, Link, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import HeadlineEmployees from './HeadlineEmployees'
import HeadlineGenres from './HeadlineGenres'
import SocialIcons from './SocialIcons'
import { IEventWithEmployees } from '../interfaces/IEvent'
import { IAgendaWithEmployees } from '../interfaces/IAgenda'
import IHeadlineEmployee from '../interfaces/IHeadlineEmployee'

interface IProps {
  event: IEventWithEmployees
}

const convertEventToHeadlineEmployees = ({ agenda }: IEventWithEmployees): IHeadlineEmployee[] => {
  const filteredAgenda: IAgendaWithEmployees = agenda.filter((item, i, arr)=> (
    arr.findIndex(t => (t.name === item.name && t.type === item.type)) === i
  ));

  const headlineEmployees: IHeadlineEmployee[] = filteredAgenda.map(({ name: itemName, type, employee: { name, image } }) => ({
    name,
    image,
    type: (type === 'DJSET') ? `${itemName} DJ` : itemName,
    role: type,
  }));

  // Crudely randomise the order
  const randomisedArr = headlineEmployees.sort(() => .5 - Math.random() );

  const midIndex = Math.round(randomisedArr.length / 2) - 1;

  // move Kizomba DJ to the end
  const kizombaDJIndex = randomisedArr.findIndex(({ type }) => type === 'Kizomba DJ');  
  if (kizombaDJIndex && kizombaDJIndex !== randomisedArr.length - 1) {
    const kizombaDJ = randomisedArr[kizombaDJIndex];
    randomisedArr.splice(kizombaDJIndex, 1);
    randomisedArr.push(kizombaDJ);
  }

    // move Salsa & Bachata Dj to the middle
    const salsaAndBachataDJIndex = randomisedArr.findIndex(({ type }) => type === 'Salsa & Bachata DJ');    
    if (salsaAndBachataDJIndex && salsaAndBachataDJIndex !== midIndex) {
      const salsaAndBachataDJ = randomisedArr[salsaAndBachataDJIndex];
      randomisedArr.splice(salsaAndBachataDJIndex, 1);
      randomisedArr.splice(midIndex, 0, salsaAndBachataDJ);
    }

  return randomisedArr;
}

const MotionImage = motion(Image)
const MotionFlex = motion(Flex)

export const Hero = ({ event }: IProps) => {
  const headlineEmployees = convertEventToHeadlineEmployees(event);
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
        >
          Next event: Friday 23rd July 2021
        </Heading>
        <Text
          fontSize={{ base: "xs", md: "sm" }}
          color="gray.300"
        >
          Details may be subject to change
        </Text>
        <HeadlineEmployees employees={headlineEmployees} />
        <NextLink href="/parking">
          <Link
            marginTop={{ base: '10', md: '16' }}
            // fontWeight="semibold"
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
