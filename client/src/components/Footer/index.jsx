import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Text,
  IconButton,
  Link,
  Stack,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box as="footer" w="100%" mt="auto" bg="#E6DFE2;.500" p={4} color="black">
      <Flex direction="column" align="center">
        {location.pathname !== "/" && (
          <Button
            colorScheme="orange"
            variant="solid"
            mb={4}
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </Button>
        )}
        <Stack direction="row" spacing={6} mb={4}>
          <Link href="https://github.com/your-profile" isExternal>
            <IconButton
              aria-label="Follow us on GitHub"
              icon={<FaGithub />}
              colorScheme="orange"
              variant="solid"
              size="lg"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/meera-g-karnavar-29ab3010/"
            isExternal
          >
            <IconButton
              aria-label="Follow us on LinkedIn"
              icon={<FaLinkedin />}
              colorScheme="orange"
              variant="solid"
              size="lg"
            />
          </Link>
          <Link href="mailto:your-email@example.com">
            <IconButton
              aria-label="Send us an email"
              icon={<FaEnvelope />}
              colorScheme="orange"
              variant="solid"
              size="lg"
            />
          </Link>
        </Stack>
        <Text fontSize="lg" textAlign="center" mb={2}>
          Follow us for more updates and news!
        </Text>
        <Text textAlign="center">There is no friend as loyal as a book</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
