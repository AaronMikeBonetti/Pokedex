const axios = require("axios");

const getAllPokemon = async (req, res) => {
  try {
    const { offset = 0, limit = 1000 } = req.query;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

const getPokemonByName = async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

module.exports = {
  getAllPokemon,
  getPokemonByName,
};
