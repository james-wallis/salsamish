import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react'

const genres = ['Salsa', 'Bachata', 'Kizomba'];

const HeadlineGenres = () => (
  <Flex flexDirection="row" color="green.200" fontSize="2xl" textTransform="uppercase">
    {
      genres.map((music, i) => (
        <React.Fragment key={music}>
          <Text paddingX="1">
            {music}
          </Text>
          {
            (i < genres.length - 1) && (
              <Text paddingX="1">
                &bull;
              </Text>
            )
          }
        </React.Fragment>
      ))
    }
  </Flex>
)

export default HeadlineGenres
