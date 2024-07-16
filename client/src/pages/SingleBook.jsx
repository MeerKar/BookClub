// import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
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
import { QUERY_SINGLE_BOOK } from "../utils/queries";
import { ADD_TO_BOOKSHELF } from "../utils/mutations";
import CommentForm from "../components/CommentForm";
import Auth from "../utils/auth";
const SingleBook = () => {
  const { title } = useParams(); // Assume the URL contains the book title

  console.log("Book Title:", title); // Debugging line

  const { loading, data, error } = useQuery(QUERY_SINGLE_BOOK, {
    variables: { bookId: title },
  });

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
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    console.error("Error fetching book data:", error);
    return (
      <div>
        Error loading book data. Please check the console for more details.
      </div>
    );
  }

  const book = data?.book || {};

  const formattedDate = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString()
    : "Unknown Date";

  const handleAddToBookshelf = async () => {
    try {
      await addToBookshelf({
        variables: { bookId: title, userId: Auth.getProfile().data._id },
      });
    } catch (err) {
      console.error("Error adding book to bookshelf:", err);
    }
  };

  return (
    <Container maxW="container.md">
      <Flex direction="column" align="center" justify="center" minH="100vh">
        <Box w="100%" p={6} boxShadow="md" borderRadius="md" textAlign="center">
          {book.image && (
            <Image src={book.image} alt={book.title} borderRadius="md" mb={4} />
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
            {book.review && <Text fontSize="md">{book.review}</Text>}
            {book.rating && (
              <Text fontSize="lg" fontWeight="bold">
                Rating: {book.rating}
              </Text>
            )}
            {book.bookReviewAuthor && (
              <Text fontSize="sm" color="gray.500">
                Reviewed by {book.bookReviewAuthor} on {formattedDate}
              </Text>
            )}
            <Button colorScheme="teal" size="md" onClick={handleAddToBookshelf}>
              Add to MyBookshelf
            </Button>
          </VStack>
          <Box mt={8}>
            <Heading as="h2" size="lg">
              Comments
            </Heading>
            <CommentForm bookId={title} bookTitle={book.title} />
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default SingleBook;
