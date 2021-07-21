import {
  Box,
  Text,
  Heading,
  Flex,
  Link,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import PageHeading from '../components/PageHeading'
import Section from '../components/Section'
import { NextSeo } from 'next-seo'
import React from 'react'
import { IoMdHeart } from 'react-icons/io'

const title = 'Covid-19'
const description = 'To ensure everyone at Salsa Mish is safe and can enjoy their night, we require guests to follow our guidelines.';


const CovidPage = () => (
  <Section>
    <NextSeo title={title} description={description} openGraph={{ title, description }} />
    <Flex
      justifyContent="flex-start"
      alignItems="flex-start"
      flexDir="column"
    >
      <PageHeading title="Covid-19 @ Salsa Mish" />
      <Text marginY={2}>Here we go, the new normal! We&apos;re all in the same boat, so let’s start this journey as safely as possible.</Text>
      <Text marginY={2}>Please do a lateral flow test on Friday morning.</Text>
      <Text marginY={2}>You can get free tests from:</Text>
      <UnorderedList paddingLeft={4} marginY={2}>
        <ListItem>Test Centres</ListItem>
        <ListItem>Your local pharmacy</ListItem>
        <ListItem>
          Or via the government website, here’s the link:{` `}
          <Link
            isExternal
            color="green.200"
            href="https://www.gov.uk/order-coronavirus-rapid-lateral-flow-tests"
            _hover={{
              textDecoration: 'none',
            }}
          >
            https://www.gov.uk/order-coronavirus-rapid-lateral-flow-tests
          </Link>
        </ListItem>
      </UnorderedList>
      <Text marginY={2}>If your test is negative, please report it to the NHS through this link:</Text>
      <Link
        isExternal
        color="green.200"
        href="https://www.gov.uk/report-covid19-result"
        _hover={{
          textDecoration: 'none',
        }}
        marginY={2}
      >
        https://www.gov.uk/report-covid19-result
      </Link>
      <Text marginY={2}>You can also report your test result by calling the phone number in your test kit’s instructions.</Text>
      <Text marginY={2}>Please note, this is not the track and trace app.</Text>
      <Text marginY={2}>You will receive a confirmation text and/or email. You must present this to one of the team members at the front desk.</Text>
      <Text marginY={2}>If your test is positive, please stay home.</Text>
      <Text marginY={2}>We will ask that you provide your full name and mobile number/email so we can contact you if need be.</Text>
      <Text marginY={2}>Your temperature will be checked before entry to the building.</Text>
      <Text marginY={2}>If you use the minibus, the driver will ask for proof of your negative test and your temperature will be checked.</Text>
      <Text marginY={2}>The above terms are in place to ensure your safety, which is of the utmost importance to all of us here at Salsa Mish.</Text>
      <Text marginY={2}>Thank you for your understanding and cooperation.</Text>
      <Text marginY={2}>All the best,</Text>
      <Text marginY={2} color="green.200" fontWeight="bold">
        Salsa Mish{` `}
        <Box as="span" color="pink" fontSize="2xl">
          <IoMdHeart style={{ display: 'inline' }} />
        </Box>
      </Text>
    </Flex>
  </Section>
)

export default CovidPage
