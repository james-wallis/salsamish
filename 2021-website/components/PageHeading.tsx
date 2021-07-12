import { Heading } from '@chakra-ui/react'

interface IProps {
  title: string
}

const PageHeading = ({ title }: IProps) => (
  <Heading
    as="h1"
    fontSize={{ base: "3xl", md: "4xl", xl: "5xl" }}
    fontWeight="normal"
    borderBottom="2px solid"
    borderColor="pink"
    paddingBottom="1"
    marginBottom={{ base: 16, md: 28, lg: 32 }}
    alignSelf="center"
  >
    {title}
  </Heading>
)

export default PageHeading
