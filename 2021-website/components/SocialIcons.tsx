import { Flex, Link } from '@chakra-ui/react'
import { FaFacebookSquare } from 'react-icons/fa'
import { GrInstagram } from 'react-icons/gr'

const SocialIcons = () => (
  <Flex marginTop="2">
    <Link isExternal href="https://www.facebook.com/SalsaMish" px={2} fontSize="3xl">
      <FaFacebookSquare />
    </Link>
    <Link isExternal href="https://www.instagram.com/salsamish" px={2} fontSize="3xl">
      <GrInstagram />
    </Link>
  </Flex>
)

export default SocialIcons