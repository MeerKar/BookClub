import axios from "axios";

const BASE_URL = "/api/bestsellers/";

export const fetchBestSellers = async (listName) => {
  const cachedData = localStorage.getItem(listName);
  if (cachedData) {
    console.log(`Using cached data for ${listName}:`, JSON.parse(cachedData));
    return JSON.parse(cachedData);
  }

  try {
    const response = await axios.get(`${BASE_URL}${listName}`);
    console.log(`API response for ${listName}:`, response.data);
    const books = response.data;
    localStorage.setItem(listName, JSON.stringify(books));
    return books;
  } catch (error) {
    console.error("Error fetching best sellers data:", error);
    return [];
  }
};
