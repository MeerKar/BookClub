import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
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
} from "@chakra-ui/react";

import { ADD_BOOK } from "../../utils/mutations";
import { QUERY_BOOKS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const BookReviewForm = () => {
  const [formState, setFormState] = useState({
    title: "FOURTH WING",
    author: "Rebecca Yarros",
    image:
      "https://storage.googleapis.com/du-prd/books/images/9781649374172.jpg",
    bookReviewText: "",
  });
  const [characterCount, setCharacterCount] = useState(0);

  const [addBook, { error, data }] = useMutation(ADD_BOOK, {
    refetchQueries: [QUERY_BOOKS, "getBooks", QUERY_ME, "me"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addBook({
        variables: {
          ...formState,
          bookReviewAuthor: Auth.getProfile().data.username,
        },
      });

      setFormState({
        title: "FOURTH WING",
        author: "Rebecca Yarros",
        image:
          "https://storage.googleapis.com/du-prd/books/images/9781649374172.jpg",
        bookReviewText: "",
      });
      setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "bookReviewText" && value.length <= 280) {
      setFormState({
        ...formState,
        [name]: value,
      });
      setCharacterCount(value.length);
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  return (
    <Container maxW="container.md">
      <Flex direction="column" align="center" justify="center" minH="100vh">
        <Box w="100%" p={6} boxShadow="md" borderRadius="md">
          <Heading as="h4" size="lg" mb={6} textAlign="center">
            Add a Book Review
          </Heading>
          <Image src={formState.image} alt={formState.title} mb={4} />
          {data ? (
            <Text>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </Text>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <FormControl id="title" isRequired mb={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Book title"
                  name="title"
                  type="text"
                  value={formState.title}
                  readOnly
                />
              </FormControl>
              <FormControl id="author" isRequired mb={4}>
                <FormLabel>Author</FormLabel>
                <Input
                  placeholder="Book author"
                  name="author"
                  type="text"
                  value={formState.author}
                  readOnly
                />
              </FormControl>
              <FormControl id="bookReviewText" isRequired mb={6}>
                <FormLabel>Review</FormLabel>
                <Textarea
                  placeholder="Here's a new review..."
                  name="bookReviewText"
                  value={formState.bookReviewText}
                  onChange={handleChange}
                  mb={4}
                />
                <Text
                  mb={2}
                  color={
                    characterCount === 280 || error ? "red.500" : "gray.600"
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
          {error && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {error.message}
            </Alert>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default BookReviewForm;
