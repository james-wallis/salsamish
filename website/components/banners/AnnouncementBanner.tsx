import { Text, FlexProps } from '@chakra-ui/react'
import InfoSection from '../InfoSection'

export interface AnnouncementBannerProps extends FlexProps {
  banner?: boolean;
}

const AnnouncementBanner = ({ banner = false, ...props }: AnnouncementBannerProps) => (
  <InfoSection banner={banner} {...props}>
    <Text textAlign="center" fontSize="md" textTransform="uppercase">
      Due to floor maintenance, SalsaMish is closed Friday 26 August
    </Text>
  </InfoSection>
)

export default AnnouncementBanner
