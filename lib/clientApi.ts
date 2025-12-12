import axios from "axios";

export const clientApi = axios.create({
  baseURL: "/api",
    timeout: 10000,
});
