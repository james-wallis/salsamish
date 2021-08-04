import { Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

interface IProps {
  banner?: boolean
  children: ReactNode
}

const Banner = ({ banner = false, children }: IProps) => (
  <Flex
    w="100vw"
    display={banner ? 'flex' : { base: 'flex', md: 'none' }}
    h={banner ? { base: '15vh', md: '12', lg: '14', xl: '16' } : { base: '28', md: '0' }}
    backgroundColor="pink"
    justifyContent="center"
    alignItems="center"
  >
    {children}
  </Flex>
)

export default Banner
