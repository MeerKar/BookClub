import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SingleBook from "./pages/SingleBook";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import Clubs from "./pages/Clubs";
import CreateClub from "./pages/CreateClub";
import JoinClub from "./pages/JoinClub";
import MyBookshelf from "./pages/MyBookshelf";
import Bookshelf from "./pages/Bookshelf";
import Auth from "./utils/auth";

const ProtectedRoute = ({ element }) => {
  return Auth.loggedIn() ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profiles/:username",
        element: <ProtectedRoute element={<Profile />} />,
      },
      {
        path: "/me",
        element: <ProtectedRoute element={<Profile />} />,
      },
      {
        path: "/books/:title",
        element: <ProtectedRoute element={<SingleBook />} />,
      },
      {
        path: "/clubs",
        element: <ProtectedRoute element={<Clubs />} />,
      },
      {
        path: "/create-club",
        element: <ProtectedRoute element={<CreateClub />} />,
      },
      {
        path: "/join-club",
        element: <ProtectedRoute element={<JoinClub />} />,
      },
      {
        path: "/my-bookshelf",
        element: <ProtectedRoute element={<MyBookshelf />} />,
      },
      {
        path: "/bookshelf",
        element: <ProtectedRoute element={<Bookshelf />} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);
