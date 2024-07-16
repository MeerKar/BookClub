const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_KEY = process.env.API_KEY; // Use the API key from environment variables
const BASE_URL = "https://api.nytimes.com/svc/books/v3/lists/current/";

router.get("/bestsellers/:listName", async (req, res) => {
  const { listName } = req.params;
  try {
    const response = await axios.get(
      `${BASE_URL}${listName}.json?api-key=${API_KEY}`
    );
    res.json(response.data.results.books);
  } catch (error) {
    console.error("Error fetching best sellers data:", error);
    res.status(500).json({ error: "Error fetching best sellers data" });
  }
});

module.exports = router;
