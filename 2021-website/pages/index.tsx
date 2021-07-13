import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import {
  Text,
  Flex,
  Box,
} from '@chakra-ui/react'
import { Hero } from '../components/Hero'
import Section from '../components/Section'
import { IEventWithEmployees } from '../interfaces/IEvent'

import dummyEvent from '../dummyEvent';
import GoogleMaps from '../components/GoogleMaps'

const content = [
  'Every Friday night dance, meet people, get fit and above all have fun!',
  'Listen to the music, feel the passion and dance like no-one is watching.',
  'Fantastic atmosphere Salsa & Bachata room Kizomba room Soft drinks bar Tea room with complimentary tea coffee, biscuits and cake.',
  'Classes from 7.30pm - 9.45pm',
  'Freestyle 9.45pm - 1.00am',
  'Greenwood Park, Tippendell Lane, AL2 3HW',
]

const title = 'Home'

const Index = ({ event }: { event: IEventWithEmployees }) => (
  <>
    <NextSeo title={title} openGraph={{ title }} />
    <Hero event={event} />
    {/* <Section color="grey">
      <Heading fontSize="3xl" fontWeight="normal" marginBottom="6">Upcoming events</Heading>

    </Section> */}
    <Section color="grey">
      {console.log(event)}
      <Flex flexDir="column" w="100%">
        {content.map(str => (
          <Text key={str} marginY="2" w={{ base: '100%', md: '96' }}>
            {str}
          </Text>
        ))}
      </Flex>
      <Box h={{ base: 80, md: 96 }} marginTop={{ base: 10, md: 0 }} w="100%">
        <GoogleMaps />
      </Box>
    </Section>
  </>
)

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const res = await fetch('http://localhost:3000/api/events')
  // const [event]: IEvent[] = await res.json()

  // const agendaWithEmployees = await Promise.all(event.agenda.map(async item => {
  //   const res = await fetch(`http://localhost:3000/api/employees/${item.employee}`)
  //   const employee = await res.json()
  //   const itemWithEmployee: IAgendaWithEmployees = {
  //     ...item,
  //     employee
  //   }
  //   return itemWithEmployee
  // }))

  // const eventWithEmployees: IEventWithEmployees = {
  //   ...event,
  //   agenda: agendaWithEmployees,
  // }  

  const eventWithEmployees: IEventWithEmployees = dummyEvent;
  
  return {
    props: {
      event: eventWithEmployees,

    },
  }
}

export default Index
