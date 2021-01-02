const axios = require('axios');
const launches = require('../data');

module.exports = {
  Query: {
    Launches: () => launches,
    hello: () => 'hello',
    Rockets: async () => {
      const res = await axios.get('https://api.spacexdata.com/v3/rockets');
      return res.data;
    },
  },
};
