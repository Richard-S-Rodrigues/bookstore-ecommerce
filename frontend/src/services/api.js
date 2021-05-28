import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
    baseURL: "http://localhost:3001",
});

api.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const createUser = async (data) => {
    try {
        return await api.post("/user/signup", data);
    } catch (error) {
        return error.response;
    }
};

export default api;
