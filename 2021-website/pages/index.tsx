import {
  Link as ChakraLink,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react'
import { Hero } from '../components/Hero'
import { Layout } from '../components/Layout'
import Section from '../components/Section'

const content = [
  'Every Friday night dance, meet people, get fit and above all have fun!',
  'Listen to the music, feel the passion and dance like no-one is watching.',
  'Fantastic atmosphere Salsa & Bachata room Kizomba room Soft drinks bar Tea room with complimentary tea coffee, biscuits and cake.',
  'Classes from 7.30pm - 9.45pm',
  'Freestyle 9.45pm - 1.00am',
  'Greenwood Park, Tippendell Lane, AL2 3HW',
]

const Index = () => (
  <Layout>
    <Hero title="Salsa Mish" />
    <Section color="#212121">
      <Heading fontSize="3xl" fontWeight="normal" marginBottom="6">Upcoming events</Heading>

    </Section>
    <Section>
      <Flex flexDir="column">
        {content.map(str => (
          <Text key={str} marginY="2" fontSize="lg" w="96">
            {str}
          </Text>
        ))}
      </Flex>
    </Section>

    
  </Layout>
)

export default Index
