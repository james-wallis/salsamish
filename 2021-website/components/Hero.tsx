import NextLink from 'next/link'
import { Flex, Heading, Image, Text, Link } from '@chakra-ui/react'
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
  const filteredAgenda: IAgendaWithEmployees[] = agenda.filter((item, i, arr)=> (
    arr.findIndex(t => (t.name === item.name && t.type === item.type)) === i
  ));

  const headlineEmployees: IHeadlineEmployee[] = filteredAgenda.map(({ name: itemName, type, employee: { name, image } }) => ({
    name,
    image,
    type: (type === 'DJSET') ? `${itemName} DJ` : itemName,
  }));
  return headlineEmployees;
}

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
      <Image
        src="/salsamish.png"
        alt="Salsamish Logo"
        height={{ base: "16", md: "20" }}
        marginTop={{ base: 20, md: 10, lg: 12 }}
      />
      <HeadlineGenres />
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
      <NextLink href="/">
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
    </Flex>
  )
}
