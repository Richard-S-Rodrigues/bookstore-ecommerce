import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/https://api.itbook.store/1.0/",
});

export default api;
