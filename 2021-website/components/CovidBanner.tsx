import { Text, Box } from '@chakra-ui/react'
import InfoSection from './InfoSection'

const CovidBanner = ({ banner = false }: { banner?: boolean }) => (
  <InfoSection banner={banner}>
    <Text textAlign="center" fontSize="md" textTransform="uppercase">
      Please bring your negative test in a clear bag or show the confirmation text/email.
    </Text>
  </InfoSection>
)

export default CovidBanner
