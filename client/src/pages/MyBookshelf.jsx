// import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import BookList from "../components/BookList";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
// import { ADD_REVIEW } from "../utils/mutations";

const MyBookshelf = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const books = data?.me?.books || [];

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh">
      <Box>
        <Heading>My Bookshelf</Heading>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <BookList books={books} title="My Bookshelf" />
        )}
      </Box>
    </Flex>
  );
};

export default MyBookshelf;
