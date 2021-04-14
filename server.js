import { createRequire } from "module";
const require = createRequire(import.meta.url);
import axios from "axios";
require("dotenv").config();

// NOTE:
// Store your user name and API key in .env file

const func = async (id) => {
  for (let i = 0; i < 6; i++) {
    try {
      const data = await axios.get(`https://clist.by/api/v1/contest/?username=${process.env.user}&api_key=${process.env.APIkey}&resource__id=${id + i}&order_by=start`);
        // Add filters as per your need
      
      if (data.data.objects[0])
        console.log(`id  ${id + i} : ${data.data.objects[0].resource.name}`);
    } catch (error) {
      console.log(error);
    }
  }
  return new Promise((resolve, reject) => resolve("true"));
};
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Customize this fetch function as per need
const fetch = async () => {
  for (let i = 0; i < 130; ) {
    await func(i);
    await timeout(60 * 1000);
    i += 6;
  }
};

fetch();
