import { Heading, Image } from '@chakra-ui/react'

interface IProps {
  title: string
  image?: {
    src: string
    alt: string
  }
}

const PageHeading = ({ title, image }: IProps) => {
  const marginBottom = {
    base: image ? 8 : 8,
    md: image ? 14 : 28,
    lg: image ? 16 : 32,
  }

  return (
    <>
      <Heading
        as="h1"
        fontSize={{ base: "3xl", md: "4xl", xl: "5xl" }}
        fontWeight="normal"
        borderBottom="2px solid"
        borderColor="pink"
        paddingBottom="1"
        marginBottom={marginBottom}
        alignSelf="center"
      >
        {title}
      </Heading>
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          marginBottom={marginBottom}
        />
      )}
    </>
  )
}

export default PageHeading
