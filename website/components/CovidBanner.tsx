import { Text, Box } from '@chakra-ui/react'
import InfoSection from './InfoSection'

const CovidBanner = ({ banner = false }: { banner?: boolean }) => (
  <InfoSection banner={banner}>
    <Text textAlign="center" fontSize="md" textTransform="uppercase">
      Salsa Mish is closed tonight (24/12/2021).
    </Text>
  </InfoSection>
)

export default CovidBanner
