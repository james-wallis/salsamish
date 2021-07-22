import { Flex, Center, Text, Image, Box } from '@chakra-ui/react'
import IHeadlineEmployee from '../interfaces/IHeadlineEmployee';

interface IProps {
  employees: IHeadlineEmployee[]
}

const HeadlineEmployees = ({ employees }: IProps) => (
  <Flex width="100%" justifyContent="center" flexDir="column" paddingY="4" paddingTop="6">
    <Flex
      backgroundImage="/salsabackdrop.png"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      maxW="maxSite"
      w="100%"
      height={{ base: "28", sm: "44", md: "56", lg: "72", xl: "80" }}
      overflow="hidden"
      alignItems="flex-end"
      paddingTop={{ base: "1", md: "2", lg: "4" }}
    >
      {employees.map(({ image, name, type }, i) => (
        <Flex
          key={`${name}-${image}-${type}`}
          width={`${100 / employees.length}%`}
          h="100%"
          justifyContent="center"
          position="relative"
        >
          <Image
            src={image}
            alt={name}
            position="absolute"
            bottom="0"
            zIndex={i % 3}
            height="100%"
            maxW="100vw"
            w="auto"
          />
        </Flex>
      ))}
    </Flex>
    <Flex width="100%" paddingTop="0">
      {employees.map(({ name, type }) => (
        <Center key={`${name}-${type}`} color="white" flexDirection="column" textAlign="center" px="1" width={`${100 / employees.length}%`}>
          <Text fontSize={{ base: "sm", sm: "sm", md: "lg", lg: "2xl" }}>{name}</Text>
          <Text fontSize={{ base: "xs", sm: "xs", md: "md", lg: "xl" }} textTransform="uppercase" fontWeight="light">{type}</Text>
        </Center>
      ))}
    </Flex>
  </Flex>
)

export default HeadlineEmployees;