import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Spinner,
  SimpleGrid,
  Image,
  Text,
  Heading,
  Container,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { QUERY_BOOKSHELF } from "../utils/queries"; // Adjust the query to fetch the bookshelf

const Bookshelf = () => {
  const { loading, data, error } = useQuery(QUERY_BOOKSHELF);

  if (loading) return <Spinner />;
  if (error) return <Text>Error loading bookshelf.</Text>;

  const books = data?.bookshelf || [];

  return (
    <Container maxW="container.lg">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {books.map((book) => (
          <Box
            key={book.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image src={book.image} alt={book.title} />
            <Box p={6}>
              <Heading as="h3" size="md">
                {book.title}
              </Heading>
              <Text>{book.author}</Text>
              <Button
                as={RouterLink}
                to={`/books/${book.id}`}
                colorScheme="orange"
                mt={2}
              >
                View Details
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Bookshelf;
