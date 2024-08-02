import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Box, Button, Text, Textarea, VStack, Heading } from "@chakra-ui/react";
import { ADD_REVIEW } from "../../utils/mutations";
import Auth from "../../utils/auth";

const CommentForm = ({ bookId, onAddComment }) => {
  const [reviewText, setReviewText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addReview, { error }] = useMutation(ADD_REVIEW);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!Auth.loggedIn()) {
      console.error("You need to be logged in to add a comment");
      return;
    }
    try {
      const { data } = await addReview({
        variables: {
          bookId,
          reviewText,
          userId: Auth.getProfile().data._id,
        },
      });

      console.log(data);

      if (onAddComment) {
        onAddComment(data.addReview); // Call the parent function if provided
      }

      setCharacterCount(0);
      setReviewText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;

    if (value.length <= 50) {
      setReviewText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <Box>
      <Heading as="h4" size="md" mb={4}>
        What do you think of this book?
      </Heading>

      {Auth.loggedIn() ? (
        <>
          <Text
            mb={4}
            color={characterCount === 50 || error ? "red.500" : "gray.500"}
          >
            Character Count: {characterCount}/50
            {error && <span> - {error.message}</span>}
          </Text>
          <VStack
            as="form"
            onSubmit={handleFormSubmit}
            spacing={4}
            align="start"
          >
            <Textarea
              name="commentText"
              placeholder="Add your comment..."
              value={reviewText}
              onChange={handleChange}
              resize="vertical"
            />
            <Button type="submit" colorScheme="orange">
              Add Comment
            </Button>
          </VStack>
        </>
      ) : (
        <Text>
          You need to be logged in to share your thoughts. Please{" "}
          <Link to="/login" style={{ color: "orange" }}>
            login
          </Link>{" "}
          or{" "}
          <Link to="/signup" style={{ color: "orange" }}>
            signup
          </Link>
          .
        </Text>
      )}
    </Box>
  );
};

export default CommentForm;
