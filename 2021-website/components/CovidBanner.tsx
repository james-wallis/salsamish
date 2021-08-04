import { Text, Box } from '@chakra-ui/react'
import InfoSection from './InfoSection'

const CovidBanner = ({ banner = false }: { banner?: boolean }) => (
  <InfoSection banner={banner}>
    <Text textAlign="center" fontSize="md" textTransform="uppercase">
      Please bring your negative lateral flow{` `}
      <Box as="span" fontWeight="bolder">
        confirmation text.
      </Box>
      {` `} Not the test itself.
    </Text>
  </InfoSection>
)

export default CovidBanner
