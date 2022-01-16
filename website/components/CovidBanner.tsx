import { Text, FlexProps } from '@chakra-ui/react'
import InfoSection from './InfoSection'

export interface CovidBannerProps extends FlexProps {
  banner?: boolean;
}

const CovidBanner = ({ banner = false, ...props }: CovidBannerProps) => (
  <InfoSection banner={banner} {...props}>
    <Text textAlign="center" fontSize="md" textTransform="uppercase">
      Please bring your negative test in a clear bag or show the NHS confirmation text/email.
    </Text>
  </InfoSection>
)

export default CovidBanner
