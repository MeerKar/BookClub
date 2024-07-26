import { Box, Image, Text, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const BookCard = ({ title, author, image, bookId }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={image} alt={title} />
      <Box p={6}>
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          {title}
        </Text>
        <Text mb={4}>{author}</Text>
        <Button
          as={RouterLink}
          to={`/books/${bookId}`}
          colorScheme="orange"
          size="sm"
        >
          View Details
        </Button>
      </Box>
    </Box>
  );
};

export default BookCard;
