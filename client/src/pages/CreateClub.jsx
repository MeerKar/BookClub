// import React from "react";
import {
  Box,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const CreateClub = () => {
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    const clubs = JSON.parse(localStorage.getItem("clubs")) || [];
    const newClub = { clubName, description };
    localStorage.setItem("clubs", JSON.stringify([...clubs, newClub]));

    toast({
      title: "Club created.",
      description: `You have successfully created the ${clubName} club.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    setClubName("");
    setDescription("");
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh">
      <Box p={6} boxShadow="md" borderRadius="md" w="100%" maxW="md">
        <Heading mb={6}>Create Club</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="clubName" mb={4} isRequired>
            <FormLabel>Club Name</FormLabel>
            <Input
              type="text"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
            />
          </FormControl>
          <FormControl id="description" mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="orange" w="full">
            Create Club
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default CreateClub;
