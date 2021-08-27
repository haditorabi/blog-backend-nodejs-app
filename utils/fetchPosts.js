const axios = require('axios');
const Cache = require('../handlers/cacheHandler');

const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new Cache(ttl); // Create a new cache service instance

const fetchPostsByTag = async (tag) => {
  try {
      return cache.get(tag, async () => {
        const response = await axios.get(`${process.env.HATCHWAYS_API}?tag=${tag}`);
        return response.data.posts;
      }).then((result) => {
        return result;
      });
    } catch (err) {
        console.log("Error: " + err.message)
    }
}
const fetchTagsPosts = async (tagsRequests) => {
  try {
    const responses = await axios.all(tagsRequests)
        return responses;
  } catch (err) {
    console.log("Error: " + err.message)
  }
}
module.exports = {fetchTagsPosts, fetchPostsByTag}
