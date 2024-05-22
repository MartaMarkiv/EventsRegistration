const axios = require("axios");

const options = {
  method: "GET",
  url: process.env.EVENT_URL,
  params: {
    c: "caveat",
    json: "true"
  },
  headers: {
    "X-RapidAPI-Key": process.env.EVENT_API_KEY,
    "X-RapidAPI-Host": process.env.EVENT_API_HOST
  }
};

module.exports = async() => {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};