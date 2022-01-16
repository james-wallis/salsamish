import {
  Link,
  Box,
  Text,
  Heading,
  Flex,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import PageHeading from '../components/PageHeading'
import Section from '../components/Section'
import { NextSeo } from 'next-seo'

const title = 'FAQs'
const description = 'Answers to frequently asked questions'

const faqs = [
  {
    question: 'Do I need a partner?',
    answer: 'No, during classes you are moved to different partners. Freestyle - ask people to dance with you.',
  },
  {
    question: 'Do I need to pre book?',
    answer: 'There is no pre booking, just turn up on the night.',
  },
  {
    question: 'What are the other people like?',
    answer: 'The salsa crowd is very mixed, all ages, all nationalities, all abilities.',
  },
  {
    question: 'What clothes should I wear?',
    answer: 'Something you are comfortable moving around in. Some are casual some bling it up.',
  },
  {
    question: 'What shoes should I wear?',
    answer: 'The sole of your shoes need to glide on the floor, i.e. leather soles or dance shoes.',
  },
  {
    question: 'What time are the classes?',
    jsx: <>
      <Text fontWeight="semibold">Beginners</Text>
      <Text>Bachata 7.30 - 8.00</Text>
      <Text>Kizomba 8.00 - 8.50</Text>
      <Text>Salsa 8.50 - 9.45</Text>
      <Text marginTop="2" fontWeight="semibold">Improvers</Text>
      <Text>Bachata 9.15 - 9.45</Text>
      <Text>Kizomba 8.00 - 8.50</Text>
      <Text>Salsa 8.50 - 9.45</Text>
      <Text fontStyle="italic" marginTop="2">
        The classes are timed so you can dance all evening and stay for freestyle.
      </Text>
    </>,
  },
  {
    question: 'What refreshments are available?',
    jsx: <>
      <Text marginY="1">Soft drinks bar</Text>
      <Text marginY="1">
        Complimentary tea, coffee, biscuits and cake. The tea room open is open 10.15 - 12.15
      </Text>
      <Text marginY="1">
        We do not sell alcohol but you can bring your own
      </Text>
    </>,
  },
  {
    question: 'Is there parking?',
    jsx: <>
      <Text marginY="1">The main carpark is usally full by 9.00pm</Text>
      <Text marginY="1">There is a second car park 0.4 miles away with a free mini bus every 15 minutes.</Text>
      <Text marginY="1" marginBottom={{ base: 2, md: 3 }}>Please do not park in nearby streets.</Text>
      <NextLink href="/parking">
        <Link textDecor="underline" fontWeight="semibold">Visit parking page</Link>
      </NextLink>
    </>,
  },
  {
    question: 'Is it near a train station?',
    answer: 'St Albans is the nearest',
  },
  {
    question: 'Is it near a motorway?',
    answer: 'The venue is close to J21a M25 and J6a M1',
  },
  {
    question: 'Are there any hotels nearby?',
    jsx: <UnorderedList paddingLeft="4">
      <ListItem>Mercure St Albans Noke Hotel</ListItem>
      <ListItem>Sopwell House</ListItem>
      <ListItem>St Michael&apos;s Manor Hotel</ListItem>
      <ListItem>White Hart Hotel St Albans</ListItem>
      <ListItem>Premier Inn St Albans City Centre Hotel</ListItem>
    </UnorderedList>,
  },
  {
    question: 'What happens to lost property?',
    answer: 'Any left items are kept at Greenwood Park. Please ask at the front desk next time you are at Salsa Mish. After a few months items are dontated to charity.',
  },
  {
    question: 'Is there any photography?',
    answer: 'Photographs are taken most Fridays. If you do not want to be in any photos posted on social media please tell the photographer.',
  },
  {
    question: 'Where can I see the photos taken?',
    answer: 'Julian Robbins and John Boot are photographers that regularly take photos. They add them to albums on Facebook, usually with a link on the Salsa Mish page.',
  },
]

const FAQPage = () => (
  <Section>
    <NextSeo title={title} description={description} openGraph={{ title, description }} />
    <Flex
      justifyContent="flex-start"
      alignItems="flex-start"
      flexDir="column"
    >
      <PageHeading title="Frequently Asked Questions" />
      {
        faqs.map(({ question, answer, jsx }) => (
          <Box
            key={question}
            fontSize="md"
            marginBottom={{ base: 4, md: 8 }}
            maxW={{ md: "90%", lg: "80%", xl: "60%" }}
          >
            <Heading
              as="h2"
              color="green.200"
              fontWeight="normal"
              fontSize={{ base: "xl", md: "2xl" }}
              marginBottom={{ base: 0.5, md: 1 }}
            >
              {question}
            </Heading>
            {
              (jsx) ? jsx : (
                <Text>{answer}</Text>
              )
            }
          </Box>
        ))
      }
    </Flex>
  </Section>
)

export default FAQPage
