import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Input,
  Textarea,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Flex,
  Container,
  Alert,
  AlertIcon,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { ADD_REVIEW } from "../../utils/mutations"; // Ensure this mutation is correct
import { QUERY_SINGLE_BOOK, QUERY_BOOKS, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";

const BookReviewForm = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(QUERY_SINGLE_BOOK, {
    variables: { id },
  });

  const [review, setReview] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addBookReview, { error: submitError, data: submitData }] = useMutation(
    ADD_REVIEW,
    {
      refetchQueries: [QUERY_BOOKS, "getBooks", QUERY_ME, "me"],
    }
  );

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Container maxW="container.md">
        <Flex direction="column" align="center" justify="center" minH="100vh">
          <Text fontSize="xl" color="red.500">
            An error occurred: {error.message}
          </Text>
        </Flex>
      </Container>
    );
  }

  const book = data?.book || {};

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 280) {
      setReview(value);
      setCharacterCount(value.length);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addBookReview({
        variables: {
          bookId: id,
          reviewText: review,
          username: Auth.getProfile().data.username,
        },
      });
      setReview("");
      setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxW="container.md">
      <Flex direction="column" align="center" justify="center" minH="100vh">
        <Box w="100%" p={6} boxShadow="md" borderRadius="md">
          <Heading as="h4" size="lg" mb={6} textAlign="center">
            Add a Book Review
          </Heading>
          <Image src={book.image} alt={book.title} mb={4} />
          {submitData ? (
            <Text>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </Text>
          ) : (
            <form onSubmit={handleSubmit}>
              <FormControl id="title" isRequired mb={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Book title"
                  name="title"
                  type="text"
                  value={book.title}
                  readOnly
                />
              </FormControl>
              <FormControl id="author" isRequired mb={4}>
                <FormLabel>Author</FormLabel>
                <Input
                  placeholder="Book author"
                  name="author"
                  type="text"
                  value={book.author}
                  readOnly
                />
              </FormControl>
              <FormControl id="bookReviewText" isRequired mb={6}>
                <FormLabel>Review</FormLabel>
                <Textarea
                  placeholder="Here's a new review..."
                  name="bookReviewText"
                  value={review}
                  onChange={handleChange}
                  mb={4}
                />
                <Text
                  mb={2}
                  color={
                    characterCount === 280 || submitError
                      ? "red.500"
                      : "gray.600"
                  }
                >
                  Character Count: {characterCount}/280
                </Text>
              </FormControl>
              <Button colorScheme="blue" width="100%" type="submit">
                Add a review
              </Button>
            </form>
          )}
          {submitError && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {submitError.message}
            </Alert>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default BookReviewForm;
