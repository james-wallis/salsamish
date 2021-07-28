import { Box, Flex, Text } from "@chakra-ui/react"

const CovidBanner = ({ banner = false }: { banner?: boolean }) => (
  <Flex
    w="100vw"
    display={banner ? 'flex' : { base: 'flex', md: 'none' }}
    h={banner ? { base: '15vh', md: '12', lg: '14', xl: '16' } : { base: '28', md: '0' }}
    backgroundColor="pink"
    justifyContent="center"
    alignItems="center"
  >
    <Text textAlign="center" fontSize="md" textTransform="uppercase">
      Please bring your negative lateral flow{` `}
      <Box as="span" fontWeight="bolder">
        confirmation text.
      </Box>
      {` `} Not the test itself.
    </Text>
  </Flex>
)

export default CovidBanner
