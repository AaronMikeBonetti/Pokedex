const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

app.use(cors());
app.use(express.json());

app.get("/api/pokemon", async (req, res) => {
  try {
    const { offset = 0, limit = 1000 } = req.query;
    const response = await axios.get(
      `${BASE_URL}?offset=${offset}&limit=${limit}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/api/pokemon/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(`${BASE_URL}/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port! ${PORT}`);
});
