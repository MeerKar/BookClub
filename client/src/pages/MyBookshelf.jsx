import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Flex,
  Button,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { QUERY_BOOKSHELF } from "../utils/queries";
import Auth from "../utils/auth";
import { Link as RouterLink } from "react-router-dom";

const MyBookshelf = () => {
  const { loading, data } = useQuery(QUERY_BOOKSHELF, {
    variables: { userId: Auth.getProfile().data._id },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const books = data?.bookshelf || [];

  return (
    <Box bg="#f8ede3" p={8}>
      <Heading as="h1" mb={8} textAlign="center">
        My Bookshelf
      </Heading>
      {books.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {books.map((book) => (
            <Box
              key={book._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg="white"
              boxShadow="md"
              _hover={{ boxShadow: "lg" }}
            >
              <Image src={book.book_image} alt={book.title} />
              <Box p={6}>
                <VStack align="start" spacing={4}>
                  <Badge
                    borderRadius="full"
                    px="2"
                    colorScheme="teal"
                    alignSelf="flex-end"
                  >
                    {book.category}
                  </Badge>
                  <Heading as="h3" size="lg">
                    {book.title}
                  </Heading>
                  <Text fontWeight="bold" color="gray.600">
                    {book.author}
                  </Text>
                  <Text noOfLines={3}>{book.description}</Text>
                  <Button
                    as={RouterLink}
                    to={`/books/${book.primary_isbn10}`}
                    colorScheme="orange"
                    mt={4}
                  >
                    View Details
                  </Button>
                </VStack>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Flex justify="center" align="center" direction="column" minH="50vh">
          <Text fontSize="xl" color="gray.500" mb={4}>
            Your bookshelf is empty.
          </Text>
          <Button as={RouterLink} to="/bookshelf" colorScheme="orange">
            Add Books
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default MyBookshelf;
