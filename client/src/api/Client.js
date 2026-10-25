import axios from "axios";

// set the base url so we dont have to type it every time
const client = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default client;
