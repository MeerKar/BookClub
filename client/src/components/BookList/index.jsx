import { Link } from "react-router-dom";
import { Box, Heading, Text, Image } from "@chakra-ui/react";

const BookList = ({
  books,
  // title,
  author,
  // showTitle = true,
  showUsername = true,
  showAuthor = true,
}) => {
  if (!books.length) {
    return (
      <Heading as="h3" size="lg">
        No Books Yet
      </Heading>
    );
  }

  return (
    <Box>
      {/* {showTitle && (
        <Heading as="h3" size="lg" mb={4}>
          {title}
        </Heading>
      )} */}
      {showAuthor && (
        <Heading as="h2" size="md" mb={4}>
          {author}
        </Heading>
      )}
      {books &&
        books.map((book) => (
          <Box
            key={book._id}
            borderWidth={1}
            borderRadius="lg"
            overflow="hidden"
            mb={4}
          >
            <Box p={6} bg="primary.500" color="white">
              {showUsername ? (
                <Link to={`/profiles/${book.bookReviewAuthor}`}>
                  <Text fontSize="xl">{book.bookReviewAuthor}</Text>
                  <Text fontSize="sm">
                    reviewed this book at {book.createdAt}
                  </Text>
                </Link>
              ) : (
                <Text fontSize="sm">
                  You had reviewed this book at {book.createdAt}
                </Text>
              )}
            </Box>
            <Box p={6}>
              <Image src={book.image} alt={book.title} mb={4} />
              <Text>{book.bookReviewText}</Text>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default BookList;
