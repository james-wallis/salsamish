import { Flex, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavigationItem from './NavigationItem';
import { motion } from 'framer-motion';

interface IProps {
  fixed?: boolean
}

const links = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Parking',
    href: '/parking',
  },
  {
    name: 'FAQs',
    href: '/faq',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Venue Tour',
    href: '/venue-tour',
  },
  {
    name: 'Call +44(0)7832 359209',
    type: 'call',
    href: 'tel:+447832359209',
  },
  {
    name: 'Email mish@salsamish.co.uk',
    type: 'call',
    href: 'mailto:mish@salsamish.co.uk',
    mobileOnly: true,
  },
];

const MotionFlex = motion(Flex)

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0.8, x: '100%' },
};


const Navigation = ({ fixed = false }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const close = () => isOpen && setIsOpen(false);
    router.events.on('routeChangeComplete', close)
    return () => {
      router.events.off('routeChangeComplete', close)
    }
  }, [router.events, isOpen])

  const initialFramerState = useBreakpointValue({ base: 'closed', md: 'open' })

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        icon={
          isOpen ? <CloseIcon w={7} h={7} background="black" /> : <HamburgerIcon w={10} h={10} />
        }
        variant={'ghost'}
        aria-label={'Toggle Navigation'}
        position="fixed"
        top="5"
        right="5"
        background="black"
        _hover={{
          background: "black"
        }}
        display={{ md: 'none' }}
        zIndex="2000"
      />
      <MotionFlex
        id="navigation"
        textTransform="uppercase"
        listStyleType="none"
        fontSize={{ base: "lg", md: "md", lg: "lg", xl: "xl" }}
        width="100vw"
        alignItems="center"
        justifyContent="center"
        background="black"
        zIndex="1000"
        position={{ base: "fixed", md: fixed ? "fixed" : "relative" }}
        top={{ md: fixed ? 0 : 'auto' }}
        flexDir="column"
        paddingBottom={{ base: "10vh", md: "0" }}

        // Framer motion props
        variants={variants}
        initial={initialFramerState || 'closed'}
        animate={isOpen || initialFramerState === 'open' ? 'open' : 'closed'}
        transition={{ type: "easeIn" }}
      >
        <Flex
          flexDir={{ base: "column", md: "row" }}
          height={{ base: "100vh", md: 14, lg: 16, xl: 20 }}
          alignItems="center"
          justifyContent="center"
        >
          {links.map(({ name, href, type, mobileOnly }, i) => (
            <NavigationItem key={`navitem-${name}`} name={name} href={href} type={type} mobileOnly={mobileOnly} />
          ))}
        </Flex>
      </MotionFlex>
    </>
  )
}

export default Navigation
