import { Text, Box } from '@chakra-ui/react'
import InfoSection from './InfoSection'

const ClosedBanner = ({ banner = false }: { banner?: boolean }) => (
  <InfoSection banner={banner}>
    <Text textAlign="center" fontSize="md" textTransform="uppercase">
      SalsaMish is{` `}
      <Box as="span" fontWeight="bolder">
        closed this Friday
      </Box>
      , 6th of August. We will reopen on the 13th of August.
    </Text>
  </InfoSection>
)

export default ClosedBanner
