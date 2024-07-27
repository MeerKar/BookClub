import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Link,
  Spacer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = () => {
    Auth.logout();
  };

  return (
    <Box bg="#ffffff" p={4} color="#333333" boxShadow="sm">
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Link as={RouterLink} to="/">
            <img
              src="https://cdn.mos.cms.futurecdn.net/eaHcUAyr5ZWH7Su96Caka9-320-80.jpg"
              alt="Readers Den"
              style={{ width: "50px", height: "auto", marginRight: "8px" }}
            />
          </Link>
          <Heading
            as={RouterLink}
            to="/"
            size="lg"
            fontWeight="bold"
            fontStyle="italic"
            color="#C43E12"
          >
            Readers Den
          </Heading>
        </Flex>
        <Spacer />
        {Auth.loggedIn() ? (
          <Menu>
            <MenuButton as={Button} colorScheme="orange" variant="outline">
              Menu
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/signup">
                Sign Up
              </MenuItem>
              <MenuItem as={RouterLink} to="/clubs">
                Join a Book Club
              </MenuItem>
              <MenuItem as={RouterLink} to="/bookshelf">
                Bookshelf
              </MenuItem>
              <MenuItem as={RouterLink} to="/my-bookshelf">
                My Bookshelf
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Flex align="center">
            <Link
              as={RouterLink}
              to="/clubs"
              mr={4}
              color="#333333"
              fontWeight="bold"
            >
              Join a Book Club
            </Link>
            <Link
              as={RouterLink}
              to="/bookshelf"
              mr={4}
              color="#333333"
              fontWeight="bold"
            >
              Bookshelf
            </Link>

            <Link
              as={RouterLink}
              to="/my-bookshelf"
              mr={4}
              color="#333333"
              fontWeight="bold"
            >
              My Bookshelf
            </Link>
            <Link
              as={RouterLink}
              to="/login"
              mr={4}
              color="#333333"
              fontWeight="bold"
            >
              Log In
            </Link>
            <Button
              as={RouterLink}
              to="/signup"
              colorScheme="orange"
              variant="solid"
              fontWeight="bold"
            >
              Sign Up
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
