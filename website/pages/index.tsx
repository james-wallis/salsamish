import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { Text, Flex, Box } from '@chakra-ui/react'
import {  getClient, getEventWithEmployees, getNextEvent, getSalsaDb } from '../lib/mongo'
import { IEventWithEmployees } from '../interfaces/IEvent'
import { Hero } from '../components/Hero'
import Section from '../components/Section'
import GoogleMaps from '../components/GoogleMaps'
import { convertEventToHeadlineEmployees } from '../lib/event-utils'
import IHeadlineEmployee from '../interfaces/IHeadlineEmployee'
import CovidBanner from '../components/CovidBanner'

interface IProps {
  event: IEventWithEmployees
  headlineEmployees: IHeadlineEmployee[]
}

const content = [
  'Every Friday night dance, meet people, get fit and above all have fun!',
  'Listen to the music, feel the passion and dance like no-one is watching.',
  'Fantastic atmosphere Salsa & Bachata room Kizomba room Soft drinks bar Tea room with complimentary tea coffee, biscuits and cake.',
  'Classes from 7.30pm - 9.45pm',
  'Freestyle 9.45pm - 1.00am',
  'Greenwood Park, Tippendell Lane, AL2 3HW',
]

const title = 'Home'

const Index = ({ event, headlineEmployees }: IProps) => (
  <>
    <NextSeo title={title} openGraph={{ title }} />
    <Hero event={event} headlineEmployees={headlineEmployees} />
    {/* <Section color="grey">
      <Heading fontSize="3xl" fontWeight="normal" marginBottom="6">Upcoming events</Heading>

    </Section> */}
    <CovidBanner />
    <Section color="grey">
      <Flex flexDir="column" w="100%">
        {content.map(str => (
          <Text key={str} marginY="2" w={{ base: '100%', md: '96' }}>
            {str}
          </Text>
        ))}
      </Flex>
      <Box h={{ base: 96, md: 96 }} marginTop={{ base: 10, md: 0 }} w="100%">
        <GoogleMaps />
      </Box>
    </Section>
  </>
)

export const getStaticProps: GetStaticProps = async (context) => {
  const client = await getClient();
  const db = await getSalsaDb(client);
  const event = await getNextEvent(db);
  const eventWithEmployees = await getEventWithEmployees(db, event);
  const headlineEmployees = convertEventToHeadlineEmployees(eventWithEmployees);


  // Need to convert _id and dates to strings for Next.js, this is an easy way to do it
  const serializedEvent = JSON.parse(JSON.stringify(eventWithEmployees));
  const serializedHeadlineEmployees = JSON.parse(JSON.stringify(headlineEmployees));
  
  return {
    props: {
      event: serializedEvent,
      headlineEmployees: serializedHeadlineEmployees,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 1800, // 30 minutes in seconds
  }
}

export default Index
