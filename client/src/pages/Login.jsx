import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Flex,
  Container,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted with state:", formState);

    try {
      const { data } = await login({ variables: { ...formState } });
      console.log("Login mutation data:", data);
      Auth.login(data.login.token);
      console.log("Token stored and user logged in, navigating to /clubs");
      navigate("/clubs");
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  return (
    <Container maxW="container.md">
      <Flex direction="column" align="center" justify="center" minH="100vh">
        <Box w="100%" p={6} boxShadow="md" borderRadius="md">
          <Heading as="h4" size="lg" mb={6} textAlign="center">
            Login
          </Heading>
          {data ? (
            <Text textAlign="center">
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </Text>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <FormControl id="email" isRequired mb={4}>
                <FormLabel>Email address</FormLabel>
                <Input
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password" isRequired mb={6}>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </FormControl>
              <Button colorScheme="blue" width="100%" type="submit" mb={4}>
                Submit
              </Button>
              <Flex justify="center">
                <Text mr={2}>Dont have an account?</Text>
                <Button
                  as={Link}
                  to="/signup"
                  colorScheme="teal"
                  variant="link"
                >
                  Sign Up Here
                </Button>
              </Flex>
            </form>
          )}
          {error && (
            <Alert status="error" mt={4}>
              <AlertIcon /> {error.message}
            </Alert>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;
