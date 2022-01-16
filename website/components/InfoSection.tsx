import { Flex, FlexProps } from "@chakra-ui/react"
import { ReactNode } from "react"

interface IBannerProps extends FlexProps {
  banner?: boolean
}

const Banner = ({ banner = false, children, ...props }: IBannerProps) => (
  <Flex
    w="100vw"
    display={banner ? 'flex' : { base: 'flex', md: 'none' }}
    h={banner ? { base: '15vh', md: '12', lg: '14', xl: '16' } : { base: '28', md: '0' }}
    backgroundColor="pink"
    justifyContent="center"
    alignItems="center"
    {...props}
  >
    {children}
  </Flex>
)

export default Banner
