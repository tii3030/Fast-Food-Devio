import axios from "axios";

const api = axios.create({
  baseURL: "https://bi.eletrosom.com/",
});

export default api;