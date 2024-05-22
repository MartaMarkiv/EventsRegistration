const axios = require("axios");

const options = {
  method: "GET",
  url: "https://calendars.p.rapidapi.com/ical_fetch",
  params: {
    c: "caveat",
    json: "true"
  },
  headers: {
    "X-RapidAPI-Key": "7351465bcbmsh0d0ae45bd533675p1082ffjsn3d52d5a5f6c9",
    "X-RapidAPI-Host": "calendars.p.rapidapi.com"
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