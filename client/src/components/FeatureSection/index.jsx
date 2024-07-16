import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBestSellers } from "../API"; // Ensure this path is correct

const features = [
  {
    title: "Get Your Club Organized",
    description:
      "Manage your book club efficiently with our easy-to-use tools. Keep track of your reading lists, schedule meetings, and engage with your members all in one place.",
    image:
      "https://www.rd.com/wp-content/uploads/2022/11/GettyImages-1389876065.jpg",
    link: "/clubs",
  },
  {
    title: "Find a Club to Join",
    description:
      "Looking to join a book club? Discover a variety of clubs that match your reading interests and connect with like-minded readers.",
    image: "https://www.pbc.guru/images/pbc-guru-managed-book-clubs-home.jpg",
    link: "/join-club",
  },
  {
    title: "Discover New Books",
    description:
      "Explore our curated selection of books and find your next great read. Whether you love fiction, non-fiction, or anything in between, we've got something for everyone.",
    image:
      "https://s26162.pcdn.co/wp-content/uploads/2017/08/reading-together.jpg",
    link: "/bookshelf",
  },
];

const FeatureSection = () => {
  const [bestSellerFiction, setBestSellerFiction] = useState(null);
  const [bestSellerNonFiction, setBestSellerNonFiction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBestSellers = async () => {
      try {
        const fictionBestSellers = await fetchBestSellers("hardcover-fiction");
        const nonFictionBestSellers = await fetchBestSellers(
          "hardcover-nonfiction"
        );
        setBestSellerFiction(fictionBestSellers[0]); // Get the first book from the fiction bestsellers list
        setBestSellerNonFiction(nonFictionBestSellers[0]); // Get the first book from the non-fiction bestsellers list
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getBestSellers();
  }, []);

  return (
    <Box bg="#f8ede3" p={8}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {features.map((feature, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image src={feature.image} alt={feature.title} />
            <Box p={6} textAlign="center">
              <Heading as="h3" size="lg" mb={4}>
                {feature.title}
              </Heading>
              <Text mb={4}>{feature.description}</Text>
              <Button
                as={RouterLink}
                to={feature.link}
                colorScheme="black"
                variant="outline"
              >
                {feature.title}
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      {loading ? (
        <Flex direction="column" align="center" justify="center" minH="20vh">
          <Text>Loading best sellers...</Text>
        </Flex>
      ) : error ? (
        <Flex direction="column" align="center" justify="center" minH="20vh">
          <Text color="red.500">Error: {error}</Text>
        </Flex>
      ) : (
        <Box
          w="100%"
          p={6}
          boxShadow="md"
          borderRadius="md"
          textAlign="center"
          mt={8} // Add some top margin to separate it from the above content
        >
          <Heading as="h2" size="lg" mb={4}>
            Current Best Sellers
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            {bestSellerFiction && (
              <Box
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                p={4}
                textAlign="center"
              >
                <Heading as="h3" size="md" mb={2}>
                  Fiction
                </Heading>
                <Flex
                  direction={["column", null, "row"]}
                  align="center"
                  justify="center"
                >
                  <Image
                    src={bestSellerFiction.book_image}
                    alt={bestSellerFiction.title}
                    borderRadius="md"
                    mb={[4, null, 0]}
                    mr={[0, null, 4]}
                  />
                  <Box textAlign="left">
                    <Heading as="h4" size="sm" mb={2}>
                      {bestSellerFiction.title}
                    </Heading>
                    <Text fontStyle="italic" mb={2}>
                      {bestSellerFiction.description}
                    </Text>
                    <Text>
                      <strong>Author:</strong> {bestSellerFiction.author}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            )}
            {bestSellerNonFiction && (
              <Box
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                p={4}
                textAlign="center"
              >
                <Heading as="h3" size="md" mb={2}>
                  Non-Fiction
                </Heading>
                <Flex
                  direction={["column", null, "row"]}
                  align="center"
                  justify="center"
                >
                  <Image
                    src={bestSellerNonFiction.book_image}
                    alt={bestSellerNonFiction.title}
                    borderRadius="md"
                    mb={[4, null, 0]}
                    mr={[0, null, 4]}
                  />
                  <Box textAlign="left">
                    <Heading as="h4" size="sm" mb={2}>
                      {bestSellerNonFiction.title}
                    </Heading>
                    <Text fontStyle="italic" mb={2}>
                      {bestSellerNonFiction.description}
                    </Text>
                    <Text>
                      <strong>Author:</strong> {bestSellerNonFiction.author}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            )}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
};

export default FeatureSection;
