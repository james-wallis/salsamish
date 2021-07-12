import { GetServerSideProps } from 'next'
import {
  Link as ChakraLink,
  Heading,
  Text,
  Flex,
  Image,
} from '@chakra-ui/react'
import { Hero } from '../components/Hero'
import { Layout } from '../components/Layout'
import Section from '../components/Section'
import { IEvent, IEventWithEmployees } from '../interfaces/IEvent'
import { IAgendaWithEmployees } from '../interfaces/IAgenda'

const content = [
  'Every Friday night dance, meet people, get fit and above all have fun!',
  'Listen to the music, feel the passion and dance like no-one is watching.',
  'Fantastic atmosphere Salsa & Bachata room Kizomba room Soft drinks bar Tea room with complimentary tea coffee, biscuits and cake.',
  'Classes from 7.30pm - 9.45pm',
  'Freestyle 9.45pm - 1.00am',
  'Greenwood Park, Tippendell Lane, AL2 3HW',
]

const Index = ({ event }: { event: IEventWithEmployees }) => (
  <Layout>
    <Hero event={event} />
    {/* <Section color="grey">
      <Heading fontSize="3xl" fontWeight="normal" marginBottom="6">Upcoming events</Heading>

    </Section> */}
    <Section color="grey">
      {console.log(event)}
      <Flex flexDir="column">
        {content.map(str => (
          <Text key={str} marginY="2" w="96">
            {str}
          </Text>
        ))}
      </Flex>
      {/* <Image src="/minibus.jpeg" alt="Parking map" h="lg" /> */}
    </Section>
  </Layout>
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

  const eventWithEmployees: IEventWithEmployees = {
    _id: 's',
    agenda: [],
    name: 's',
    type: 's',
    date: {
      start: '',
      end: '',
    },
    description: 'd',
    facebook: 'f',
  }
  
  return {
    props: {
      event: eventWithEmployees,
    },
  }
}

export default Index
