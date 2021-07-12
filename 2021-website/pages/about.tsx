import {
  Box,
  Text,
  Heading,
  Flex,
} from '@chakra-ui/react'
import PageHeading from '../components/PageHeading'
import Section from '../components/Section'
import { NextSeo } from 'next-seo'

const title = 'About'
const description = 'Learn more about Salsa Mish and his life journey'

const questions = [
  {
    question: 'How long have you been dancing?',
    answer: 'I have been interested in dancing since I was 2 years of age, I was called the dancer by the family. I always danced at parties and almost every day.',
  },
  {
    question: 'What dance influenced you?',
    answer: 'Egyptian belly dancing as I am Egyptian who lived the first 25 years of my life in Egypt.',
  },
  {
    question: 'What made you come to the UK?',
    answer: 'When I was 14 years of age, my ex brother in law (British) \
      saw me dancing and said to me "you would make a lot of money in the UK dancing" and \
      and that sentance stayed in my head and I decided that one day I would be teaching dancing in the UK.',
  },
  {
    question: 'What did you do before coming to the UK?',
    answer: 'In Egypt I studied Medicine for 6 years but 2 months before the final. \
      I decided to go to England and try to complete my studies there. \
      After I arrived, I got a job working as a barman in \
      The Rocket Club in Holloway Road and that changed my life direction.',
  },
  {
    question: 'Where did you learn latin dancing?',
    jsx: <>
      <Text>I first saw merengue, lambada and salsa dancing, at The Rocket where I was working.</Text>
      <Text>
        I loved the music and was dancing behind and on top of the bar, my own dancing as I didn’t know the steps. 
        The lessons were in a different room to the bar so I just learnt the steps by watching people dancing after the lessons.
      </Text>
      <Text>
      I made a fool of myself every Wednesday until lambada suddenly clicked and I loved it. I learnt merengue from the first song I heard as it is much easier than Lambada.
      </Text>
      <Text>I danced every day, on my own, everywhere I went I would be dancing to any music.</Text>
    </>,
  },
  {
    question: 'When did you start teaching dance?',
    answer: 'Later that year I started to work at Club Havana in St Albans where I was teaching merengue and \
      lambada to beginners, improvers and intermediates. I soon started to teach salsa and by 1993 \
      I began to teach and DJ for different clubs all around England.',
  },
  {
    question: 'When did you start your own club?',
    answer: 'I have always wanted to run my own club so I started Salsa Mish in 2005 at Esporta fitness club \
      in Hemel Hempstead every Saturday, I was still teaching Tuesday, Thursday and Friday nights at Club Havana.',
  },
  {
    question: 'When did you open Greenwood Park?',
    answer: 'When Club Havana stopped latin dancing I knew there was a need to keep a salsa event on Friday nights \
      in St Albans going. I looked and found Greenwood Park Community Centre. I felt that this was the right venue \
      so started my regular Friday Night in June 2010.',
  },
  {
    question: 'Have you ever worked with kids?',
    answer: 'I have taught dancing to kids in over 50 schools, mostly free, \
      to inspire them to dance and give them confidence, self-esteem, happiness and a lot of laughter!',
  },
  {
    question: 'What was your goal opening a regular weekly event?',
    jsx: <>
      <Text>
        I started Salsa Mish at Greenwood Park to share my passion for dancing and the music.
      </Text>
      <Text>
        I want to inspire people to dance. I provide a safe place for them to do so. 
        My Friday night helps people relax, dance, meet, socialise, respect, have fun 
        and forget problems for one night. Salsa Mish is like a big family gathering 
        where every age, nationality, sex and colour is welcomed.
      </Text>
      <Text>
        I love my Friday night club, whether it is busy or not, the atmosphere is always great. 
        My satisfaction comes from seeing happiness and laughter all around me with amazing music and amazing people.
      </Text>
    </>,
  },
]


const AboutPage = () => (
  <Section>
    <NextSeo title={title} description={description} openGraph={{ title, description }} />
    <Flex
      justifyContent="flex-start"
      alignItems="flex-start"
      flexDir="column"
    >
      <PageHeading title="About Salsa Mish" />
      {
        questions.map(({ question, answer, jsx }) => (
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

export default AboutPage
