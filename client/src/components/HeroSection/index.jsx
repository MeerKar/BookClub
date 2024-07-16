import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Image,
  Container,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const HeroSection = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        bg="#f8ede3"
        p={8}
      >
        <Box flex="1" p={4}>
          <Heading as="h1" size="2xl" mb={4} color="#333">
            Building community through books
          </Heading>
          <Text fontSize="xl" mb={6} color="#555">
            Discover, Discuss, Delight:Uniting Readers Everywhere
          </Text>
          <Button
            as={RouterLink}
            to="/create-club"
            colorScheme="orange"
            size="lg"
          >
            Start a Club
          </Button>
        </Box>
        <Box flex="1" p={4}>
          <Image
            src="https://klkranes.files.wordpress.com/2018/09/book-club-discussion.jpg"
            alt="Hero Image"
            borderRadius="md"
          />
        </Box>
      </Flex>
    </Container>
  );
};

export default HeroSection;
