import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  VStack,
  Heading,
  Container,
  Flex,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { fetchBestSellers } from "../components/API"; // Ensure this path is correct
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_TO_BOOKSHELF } from "../utils/mutations";
import CommentForm from "../components/CommentForm";

const SingleBook = () => {
  const { id } = useParams(); // Ensure this is 'id' to match the URL parameter

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const allBooks = await fetchBestSellers("hardcover-fiction");
        console.log("Fetched Books:", allBooks); // Debug: log all fetched books

        const foundBook = allBooks.find((book) => book.primary_isbn10 === id);
        console.log("Found Book:", foundBook); // Debug: log the found book
        setBook(foundBook);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const [addToBookshelf] = useMutation(ADD_TO_BOOKSHELF, {
    onCompleted: (data) => {
      console.log("Book added to bookshelf:", data);
    },
    onError: (err) => {
      console.error("Error adding book to bookshelf:", err);
    },
  });

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg="#f8ede3">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    console.error("Error fetching book data:", error);
    return (
      <Container maxW="container.md" bg="#f8ede3">
        <Flex direction="column" align="center" justify="center" minH="100vh">
          <Text fontSize="xl" color="red.500">
            An error occurred: {error}
          </Text>
        </Flex>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container maxW="container.md" bg="#f8ede3">
        <Flex direction="column" align="center" justify="center" minH="100vh">
          <Text fontSize="xl" color="red.500">
            Book not found
          </Text>
        </Flex>
      </Container>
    );
  }

  const handleAddToBookshelf = async () => {
    try {
      await addToBookshelf({
        variables: { bookId: id, userId: Auth.getProfile().data._id },
      });
    } catch (err) {
      console.error("Error adding book to bookshelf:", err);
    }
  };

  return (
    <Container maxW="container.md" bg="#f8ede3">
      <Flex direction="column" align="center" justify="center" minH="100vh">
        <Box w="100%" p={6} boxShadow="md" borderRadius="md" textAlign="center">
          {book.book_image && (
            <Image
              src={book.book_image}
              alt={book.title}
              borderRadius="md"
              mb={4}
            />
          )}
          <VStack align="start" spacing={4}>
            {book.title && (
              <Heading as="h1" size="xl">
                {book.title}
              </Heading>
            )}
            {book.author && (
              <Text fontSize="lg" color="gray.600">
                {book.author}
              </Text>
            )}
            {book.description && <Text fontSize="md">{book.description}</Text>}
            <Button
              colorScheme="orange"
              size="md"
              onClick={handleAddToBookshelf}
            >
              Add to MyBookshelf
            </Button>
            <CommentForm bookId={id} />
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default SingleBook;
