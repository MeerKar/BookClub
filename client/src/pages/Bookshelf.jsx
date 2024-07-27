import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Container,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import BookCard from "../components/BookCard";
import { fetchBestSellers } from "../components/API"; // Ensure this path is correct

const categories = [
  { name: "Fiction", listName: "hardcover-fiction" },
  { name: "Nonfiction", listName: "hardcover-nonfiction" },
  { name: "Biography", listName: "hardcover-nonfiction" }, // Verify if this should be different
  { name: "Kids", listName: "childrens-middle-grade-hardcover" }, // Corrected list name
  { name: "Technology", listName: "science" },
  { name: "Mystery & Thriller", listName: "hardcover-fiction" }, // Check if this is correct
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Bookshelf = () => {
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const booksByCategory = {};
        for (const category of categories) {
          const books = await fetchBestSellers(category.listName);
          booksByCategory[category.name] = books;
          console.log(`Books for category ${category.name}:`, books);
          await delay(1000); // Delay of 1 second between requests
        }
        setBooks(booksByCategory);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getBooks();
  }, []);

  if (loading) {
    return (
      <Container maxW="container.md">
        <Flex direction="column" align="center" justify="center" minH="100vh">
          <Spinner size="xl" />
        </Flex>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.md">
        <Flex direction="column" align="center" justify="center" minH="100vh">
          <Text fontSize="xl" color="red.500">
            An error occurred: {error}
          </Text>
        </Flex>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg">
      <Flex direction="column" align="center" justify="center" minH="100vh">
        <Box w="100%" p={6} boxShadow="md" borderRadius="md" textAlign="center">
          <Heading as="h1" size="2xl" mb={6}>
            Bookshelf
          </Heading>
          <Flex direction="column" align="start" w="100%">
            {Object.keys(books).map((category, index) => (
              <Box key={index} w="100%" mb={8}>
                <Heading as="h2" size="lg" mb={4}>
                  {category}
                </Heading>
                <SimpleGrid columns={[1, null, 5]} spacing={4}>
                  {books[category].map((book, idx) => (
                    <BookCard
                      key={idx}
                      title={book.title}
                      author={book.author}
                      image={book.book_image}
                      bookId={book.primary_isbn10}
                    />
                  ))}
                </SimpleGrid>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default Bookshelf;
