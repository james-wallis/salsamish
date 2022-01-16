import {
  Box,
  Text,
  Flex,
  UnorderedList,
  ListItem,
  Image,
  Heading,
} from '@chakra-ui/react'
import { IoMdHeart } from 'react-icons/io'
import { NextSeo } from 'next-seo'
import PageHeading from '../components/PageHeading'
import Section from '../components/Section'
import GoogleMaps, { building } from '../components/GoogleMaps'

const title = 'Parking'
const description = 'The main car park at Greenwood Park is usually full by around 9.00pm. Use the overspill car park where possible.'

const ParkingPage = () => (
  <>
    <Section>
      <NextSeo title={title} description={description} openGraph={{ title, description }} />
      <Flex
        justifyContent="flex-start"
        alignItems="flex-start"
        flexDir="column"
        w="100%"
      >
        <PageHeading title="Parking at Salsa Mish" />
        <Flex flexDir={{ base: 'column', md: 'row' }} alignItems='center'>
          <Box
            // paddingRight={{ md: 4 }}
          >
            {/* <Text marginBottom="4">The main car park at Greenwood Park is usually full by around 9.00pm.</Text>
            <Text marginY="4" marginBottom="1">Please use the overspill car park:</Text>
            <Text color="green.200">Midway Surgery,</Text>
            <Text color="green.200">93 Watford Road,</Text>
            <Text color="green.200" marginBottom="4">AL2 3JX</Text>
            <Text marginY="4">
              This is less than a 5 minute drive away with a{` `}
              <Box as="span" color="green.200" fontWeight="bold">free </Box>
              <Box as="span" color="green.200">mini bus shuttle every 15 minutes</Box>
              {` `}from 9.15pm.
            </Text>
            <Text marginY="4">
              <Box as="span" color="green.200" textTransform="uppercase">Plus</Box>
              {` `}a chance to win free entry for your next time!
            </Text> */}
            <Text marginY="4" marginBottom="1" textTransform="uppercase" color="green.200">Important</Text>
            <Text marginY="4">Please use the main car park until further notice.</Text>
            <Text>To keep the roads clear for emergency vehicle access, and cause minimal disruption to our neighbours on a Friday night:</Text>
            <UnorderedList color="green.200" paddingLeft="4">
              <ListItem>Don&apos;t park where there are traffic cones.</ListItem>
              <ListItem>Don&apos;t block any driveway.</ListItem>
              <ListItem>Don&apos;t park on grass verges.</ListItem>
            </UnorderedList>
            <Text marginY="4">If you have to park on the road, please be considerate to our neighbours by not blocking driveways or causing loud noise.</Text>
            <Text marginY="4">Car park helpers are there every Friday and will advise you where to park.</Text>
            <Text marginY="4">They speak on behalf of Salsa Mish and will deal with any issues with neighbours and visitors to Salsa Mish.</Text>
            <Text marginY="4" color="green.200" textTransform="uppercase" fontWeight="bold">
              Thank you!{` `}
              <Box as="span" color="pink" fontSize="2xl">
                <IoMdHeart style={{ display: 'inline' }} />
              </Box>
            </Text>
          </Box>
          {/* <Box paddingLeft={{ md: 4 }}>
            <Heading
              marginTop={{ base: 10, md: 0 }}
              marginBottom="4"
              fontWeight="normal"
              fontSize={{ base: '2xl', md: '3xl' }}
              textAlign="center"
            >
              Directions to overflow car park
            </Heading>
            <Image src="/minibus.jpeg" alt="parking instructions" maxW="100%" />
          </Box> */}
        </Flex>
      </Flex>
    </Section>
    <Section color="grey">
      <Box h={{ base: 96, md: '60vh' }} marginTop={{ base: 10, md: 0 }} w="100%">
        <GoogleMaps zoom={14.8} center={building} />
      </Box>
    </Section>
  </>
)

export default ParkingPage
