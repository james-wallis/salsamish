import { Flex, IconButton } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import NavigationItem from './NavigationItem';

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
    name: 'Venue Tour',
    href: '/venue-tour',
  },
  {
    name: 'About',
    href: '/about',
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

const Navigation = ({ fixed = false }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
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
      <Flex
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
        height={{ base: "100vh", md: 14, lg: 16, xl: 20 }}
        top={{ md: fixed ? 0 : 'auto' }}
        flexDir={{ base: "column", md: "row" }}
        display={{ base: isOpen ? 'flex' : 'none', md: "flex"}}
        paddingBottom={{ base: "10vh", md: "0" }}
      >
        {links.map(({ name, href, type, mobileOnly }, i) => (
          <NavigationItem key={`navitem-${name}`} name={name} href={href} type={type} mobileOnly={mobileOnly} />
        ))}
      </Flex>
    </>
  )
}

export default Navigation
