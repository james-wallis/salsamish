import { Flex, Link } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaFacebookSquare, FaTwitter } from 'react-icons/fa'
import { GrInstagram } from 'react-icons/gr'

const MotionFlex = motion(Flex)
const MotionLink = motion(Link)

const socials = [
  {
    Icon: FaFacebookSquare,
    href: 'https://www.facebook.com/SalsaMish',
  },
  {
    Icon: GrInstagram,
    href: 'https://www.instagram.com/salsamish',
  },
  {
    Icon: FaTwitter,
    href: 'https://twitter.com/salsamish',
  },
  {
    text: '👋',
    href: 'https://www.clubhouse.com/club/salsa-mish'
  }
]

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 30,
      staggerChildren: 0.2,
      duration: 0.5
    }
  }
}

const variants = {
  initial: {
    opacity: 0,
    y: -50,
  },
  animate: {
    opacity: 1,
    y: 0,
  }
}

const SocialIcons = () => (
  <MotionFlex
    marginTop={{ base: "1", md: "2" }}
    justifyContent="center"
    alignItems="center"
    variants={containerVariants}
    initial="initial"
    animate="animate"
  >
    {
      socials.map(({ Icon, href, text }) => (
        <MotionLink
          key={href}
          isExternal
          href={href}
          px={2}
          pl={Icon ? 2 : 1}
          fontSize={{ base: "2xl", md: "3xl" }}
          _hover={{
            textDecoration: 'none',
          }}
          variants={variants}
        >
          {Icon ? <Icon /> : text}
        </MotionLink>
      ))
    }
  </MotionFlex>
)

export default SocialIcons