// import React from "react";
import {
  Box,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const JoinClub = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [club, setClub] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., send data to an API
    console.log("Joining club:", { name, email, club });

    // Show a success message
    toast({
      title: "Successfully joined the club.",
      description: `You have joined the ${club} club.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // Clear the form
    setName("");
    setEmail("");
    setClub("");
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh">
      <Box p={6} boxShadow="md" borderRadius="md" w="100%" maxW="md">
        <Heading mb={6}>Join Club</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="name" mb={4} isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" mb={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="club" mb={4} isRequired>
            <FormLabel>Club Name</FormLabel>
            <Input
              type="text"
              value={club}
              onChange={(e) => setClub(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="orange" w="full">
            Join Club
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default JoinClub;
