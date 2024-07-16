import { useNavigate } from "react-router-dom";
import { Box, Text, Image, Heading } from "@chakra-ui/react";

const BookCard = ({ title, author, image, bookId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books/${bookId}`);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={handleClick}
      cursor="pointer"
    >
      <Image src={image} alt={title} />
      <Box p="6">
        <Heading fontSize="xl">{title}</Heading>
        <Text mt="4">{author}</Text>
      </Box>
    </Box>
  );
};

export default BookCard;
