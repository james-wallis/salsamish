import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion';

const genres = ['Salsa', 'Bachata', 'Kizomba'];

const MotionFlex = motion(Flex)
const MotionText = motion(Text)

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 0.4,
      duration: 0.5
    }
  }
}

const itemVariants = {
  initial: {
    opacity: 0,
    scale: 2,
    y: -50,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  }
}

const HeadlineGenres = ({ animate = true }: { animate?: boolean }) => (
  <MotionFlex
    flexDirection="row"
    color="green.200"
    fontSize={{ base: "xl", md: "2xl" }}
    textTransform="uppercase"
    variants={animate && containerVariants}
    initial="initial"
    animate="animate"
  >
    {
      genres.map((music, i) => (
        <MotionText key={music} variants={animate && itemVariants}>
          <Box
            as="span"
            paddingX="1"
          >
            {music}
          </Box>
          {
            (i < genres.length - 1) && (
              <Box
                as="span"
                paddingX={{ base: "0.5", md: "1" }}
              >
                &bull;
              </Box>
            )
          }
        </MotionText>
      ))
    }
  </MotionFlex>
)

export default HeadlineGenres
