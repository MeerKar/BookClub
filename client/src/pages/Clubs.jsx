import {
  Box,
  Flex,
  Heading,
  Container,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ClubCard from "../components/ClubCard";

const clubData = [
  {
    name: "Epic Storytellers",
    image:
      "https://i0.wp.com/bhamnow.com/wp-content/uploads/2021/09/IMG_6680.jpeg",
    description:
      "<em>Dive into epic tales and adventurous stories. Join us as we explore fantastical worlds and heroic journeys, perfect for those who love to get lost in a great narrative.</em>",
  },
  {
    name: "Realms of Reality",
    image:
      "https://gwinnettpl.libnet.info/images/events/gwinnettpl/Book_Club.jpg",
    description:
      "<em>Engage with non-fiction books that challenge your perspective and deepen your understanding of the world. Ideal for inquisitive minds who enjoy learning and discussing real-life issues.</em>",
  },
  {
    name: "Portraits in Prose",
    image:
      "https://www.thoughtco.com/thmb/teoX7PKfpnkClDB212o68dcb4N8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/578193083-56a0ea9b3df78cafdaa65bb1.jpg",
    description:
      "<em>Explore biographical and autobiographical works that offer a glimpse into the lives of fascinating individuals. Perfect for those who love personal stories and historical figures.</em>",
  },
  {
    name: "Little Page Turners",
    image:
      "https://www.redapplereading.com/blog/wp-content/uploads/02-04-bookclub-blog-1024x683.jpg",
    description:
      "<em>A fun and engaging club for young readers. We dive into children's literature, fostering a love for reading in kids through interactive and exciting book discussions.</em>",
  },
  {
    name: "Digital Innovators",
    image:
      "https://techcrunch.com/wp-content/uploads/2016/02/book-club-alice-pic.jpg",
    description:
      "<em>Stay ahead of the curve with books on the latest in technology and innovation. Perfect for tech enthusiasts and professionals looking to expand their knowledge and network.</em>",
  },
  {
    name: "Mystery & Mayhem",
    image:
      "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F629219019%2F1819301312103%2F1%2Foriginal.png?h=230&w=460&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C940%2C470&s=4f958995e741fb4c5adbd2352bc0a84b",
    description:
      "<em>For those who love suspense and thrillers, this club delves into the best mystery novels. Join us for discussions that will keep you on the edge of your seat.</em>",
  },
];

const Clubs = () => {
  return (
    <Container maxW="container.lg">
      <Box as="nav" w="100%" p={4} mb={6} bg="#f8ede3" color="#333">
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="lg">
            Clubs
          </Heading>
          <Flex>
            <Button
              as={Link}
              to="/create-club"
              mr={4}
              colorScheme="#333"
              variant="outline"
            >
              Create Club
            </Button>
            <Button
              as={Link}
              to="/my-bookshelf"
              colorScheme="#333"
              variant="outline"
            >
              My Bookshelf
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Flex direction="column" align="center" justify="center" minH="100vh">
        <Box w="100%" p={6} boxShadow="md" borderRadius="md" textAlign="center">
          <SimpleGrid columns={[1, null, 2]} spacing={6}>
            {clubData.map((club, index) => (
              <ClubCard
                key={index}
                name={club.name}
                image={club.image}
                description={club.description} // Pass description to ClubCard
              />
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Container>
  );
};

export default Clubs;
