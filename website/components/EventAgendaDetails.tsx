import { Flex, Heading, Text, Grid } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { IAgendaWithEmployees, IAgendaItemWithEmployees } from '../interfaces/IAgenda'

interface IProps {
  agenda: IAgendaWithEmployees
}

const formatDate = (date: string) => dayjs(date).format('H:mm');

const sortByTime = (item1: IAgendaItemWithEmployees, item2: IAgendaItemWithEmployees) => dayjs(item1.start).isBefore(dayjs(item2.start)) ? -1 : 1;

const onlyUniqueLessons = (event: IAgendaItemWithEmployees, index: number, self: IAgendaItemWithEmployees[]) => {
  return event.type === 'LESSON' && self.findIndex(({ name, description }) => event.name === name && event.description === description) === index;
}

const onlyUniqueDJSets = (event: IAgendaItemWithEmployees, index: number, self: IAgendaItemWithEmployees[]) => {
  return event.type === 'DJSET' && self.findIndex(({ name, description }) => event.name === name && event.description === description) === index;
}

const AgendaItem = ({ item: { name, start, end, employee, type } }: { item: IAgendaItemWithEmployees }) => (
  <Text
    key={`${name}-${start}`}
    paddingX='2'
    fontSize={{ base: 'md', md: 'lg' }}
    paddingY={{ base: 0.5, md: 1 }}
  >
    {`${formatDate(start)} - ${formatDate(end)}: ${name} with ${type === 'DJSET' ? 'DJ ' : ''}${employee.name}`}
  </Text>
)

const EventAgendaDetails = ({ agenda }: IProps) => (
  <Flex
    flexDir="column"
    justifyContent="center"
    alignItems="center"
    w="100%"
    marginBottom="4"
    marginTop="2"
  >
    <Heading
      as="h3"
      fontSize={{ base: 'lg', md: '2xl' }}
      marginBottom={{ base: 1, md: 2 }}
    >
      Classes
    </Heading>
    <Grid
      w={{ base: '100%', sm: 'lg', md: 'xl' }}
      justifyContent={{ base: 'center', sm: 'center' }}
      alignItems="center"
      textAlign="center"
      templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
    >
      {agenda.sort(sortByTime).filter(onlyUniqueLessons).map((item) => <AgendaItem key={`agenda-item-${item._id}`} item={item} />)}
    </Grid>
    <Heading
      as="h3"
      fontSize={{ base: 'lg', md: '2xl' }}
      marginBottom={{ base: 1, md: 2 }}
      marginTop={{ base: 2, md: 4 }}
    >
      DJs
    </Heading>
    <Grid
      w={{ base: '100%', sm: 'lg', md: 'xl' }}
      justifyContent={{ base: 'center', sm: 'center' }}
      alignItems="center"
      textAlign="center"
      templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
    >
      {agenda.sort(sortByTime).filter(onlyUniqueDJSets).map((item) => item.type === 'DJSET' && <AgendaItem key={item._id} item={item} />)}
    </Grid>
  </Flex>
)

export default EventAgendaDetails
