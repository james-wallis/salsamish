import { Flex, Center, Text } from '@chakra-ui/react'

interface IProps {
  employees: {
    name: string
    type: string
  }[]
}

const HeadlineEmployees = ({ employees }: IProps) => (
  <Flex width="100%" justifyContent="space-between" paddingX="16">
    {employees.map(({ name, type }) => (
      <Center key={`${name}-${type}`} color="white" flexDirection="column">
        <Text fontSize="3xl">{name}</Text>
        <Text fontSize="xl" textTransform="uppercase" fontWeight="light">{type}</Text>
      </Center>
    ))}
  </Flex>
)

export default HeadlineEmployees;