import { createRequire } from "module";
const require = createRequire(import.meta.url);
import axios from "axios";
require("dotenv").config();

// NOTE:
// Store your user name and API key in .env file

const arr = new Array(130);
const fetch = async () => {
  const url = `https://clist.by/api/v1/contest/?username=${process.env.user}&api_key=${process.env.APIkey}&limit=19900`;
  var data;
  try {
    data = await axios.get(url);
  } catch (error) {
    console.log(error);
  }
  return new Promise((resolve, reject) => resolve(data.data.objects));
};

const data = await fetch();
for (let i = 0; i < data.length; i++) {
  if (data[i].resource.id >= 130) continue;
  arr[data[i].resource.id] = data[i].resource.name;
}
for (let i = 1; i < 130; i++) {
  console.log(i + " " + arr[i]);
}
