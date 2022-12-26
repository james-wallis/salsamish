import { Text, FlexProps } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import InfoSection from '../InfoSection'

export interface AnnouncementBannerProps extends FlexProps {
  banner?: boolean;
}

const AnnouncementBanner = ({ banner = false, ...props }: AnnouncementBannerProps) => {
  const router = useRouter();

  if(router.asPath === "/venue-tour") {
    return <></>
  }

  return (
    <InfoSection banner={banner} {...props} pos={{ base: "absolute", md: "relative" }} h={{ base: 16, sm: 20 }}>
      <Text textAlign="left" fontSize={{ base: "xs", sm: "sm", md: "lg" }} textTransform="uppercase" pr={{ base: 24, sm: 6 }} pl={6}>
        NYE PARTY: Social Dancing starts from 8.30!
      </Text>
    </InfoSection>
  )
}

export default AnnouncementBanner
