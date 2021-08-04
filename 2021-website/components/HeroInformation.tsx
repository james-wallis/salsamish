import { Flex, Text } from "@chakra-ui/react"

const HeroInformation = () => (
  <Flex
    marginTop="14"
    flexDir="column"
    justifyContent="center"
    alignItems="center"
    fontSize={{ base: 'md', md: 'xl' }}
    textAlign="center"
    maxW="5xl"
  >
    <Text my={1}>Unfortunately, on Sunday 01/08, someone who attended Salsa Mish on Friday 30/07 presented some symptoms and tested positive for COVID.</Text>
    <Text my={1}>With a heavy heart, I must do what’s best for my team and my guests and close this Friday night 06/08.</Text>
    <Text my={1}>If you attended last Friday night, please follow the government guidelines and make sure you are ok ✅</Text>
    <Text my={1}>Stay safe,</Text>
    <Text>Mish</Text>
  </Flex>
)

export default HeroInformation
