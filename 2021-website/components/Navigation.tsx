import { Flex, IconButton } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import NavigationItem from './NavigationItem';

const links = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'FAQs',
    href: '/faq',
  },
  {
    name: 'Parking',
    href: '/',
  },
  {
    name: 'Venue Tour',
    href: '/',
  },
  {
    name: 'About',
    href: '/',
  },
  {
    name: 'Contact',
    href: '/',
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



const Navigation = () => {
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
        position="absolute"
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
        textTransform="uppercase"
        listStyleType="none"
        fontSize={{ base: "lg", md: "md", lg: "lg", xl: "xl" }}
        width="100vw"
        justifyContent="center"
        background="black"
        zIndex="1000"
        position={{ base: "fixed", md: "relative" }}
        height={{ base: "100vh", md: "auto" }}
        flexDir={{ base: "column", md: "row" }}
        marginTop={{ md: "2" }}
        display={{ base: isOpen ? 'flex' : 'none', md: "flex"}}
      >
        {links.map(({ name, href, type, mobileOnly }, i) => (
          <NavigationItem key={`navitem-${name}`} name={name} href={href} type={type} mobileOnly={mobileOnly} />
        ))}
      </Flex>
    </>
  )
}

export default Navigation
