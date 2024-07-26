const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_KEY = process.env.API_KEY; // Use the API key from environment variables
const BASE_URL = "https://api.nytimes.com/svc/books/v3/lists/current/";

router.get("/bestsellers/:listName", async (req, res) => {
  const { listName } = req.params;
  try {
    console.log(`Fetching best sellers for list: ${listName}`);
    console.log(`Using API key: ${API_KEY}`);

    const response = await axios.get(
      `${BASE_URL}${listName}.json?api-key=${API_KEY}`
    );

    console.log(`Response received:`, response.data);
    res.json(response.data.results.books);
  } catch (error) {
    console.error(
      "Error fetching best sellers data:",
      error.response?.data || error.message
    );

    if (error.response) {
      // Server responded with a status other than 2xx
      res.status(error.response.status).json({
        error: error.response.data,
        message: error.response.statusText,
      });
    } else if (error.request) {
      // Request was made but no response was received
      res.status(500).json({
        error: "No response received from API",
        details: error.request,
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({
        error: "Error in setting up the request",
        message: error.message,
      });
    }
  }
});

module.exports = router;
