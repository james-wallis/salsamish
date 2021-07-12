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
    >
      {employees.map(({ image, name, type }, i) => (
        <Box key={`${name}-${image}-${type}`}>
          <Image
            src={image}
            alt={name}
            transform="scale(1.3) "
            position="relative"
            zIndex={i % 3}
            // bottom="-5"
          />
        </Box>
      ))}
    </Flex>
    <Flex width="100%" justifyContent="space-around" paddingTop="0">
      {employees.map(({ name, type }) => (
        <Center key={`${name}-${type}`} color="white" flexDirection="column" textAlign="center" px="1">
          <Text fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl", xl: "3xl" }}>{name}</Text>
          <Text fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl", xl: "2xl" }} textTransform="uppercase" fontWeight="light">{type}</Text>
        </Center>
      ))}
    </Flex>
  </Flex>
)

export default HeadlineEmployees;