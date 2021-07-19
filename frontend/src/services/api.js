import { useContext } from "react"
import axios from "axios";

import { userContext } from "../contexts/UserContext";

import { logout } from "./auth";


axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: "http://localhost:3333",
});

api.interceptors.response.use((config) => {
    return config;

}, async (err) => {
    const error = err.response;
    const { getTokenFromUserDatabase } = useContext(userContext);

    // If access token expired, refresh token
    if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
        const token = await getTokenFromUserDatabase()

        return api.post("/refreshToken", { token }).then(res => {
            error.config.__isRetryRequest = true;
            return axios(error.config);
        })
        .catch(error => {
            return Promise.reject(error)
        })
    
    }

    // If refresh token expired, logout user
    if (error.status === 403 && error.config && !error.config.__isRetryRequest) {
        const token = await getTokenFromUserDatabase()

        return logout(token).then(res => {

            error.config.__isRetryRequest = true;
            return axios(error.config);
        })
        .catch(error => {
            return Promise.reject(error)
        })

    }

    return Promise.reject(error);
})


export const createUser = async (data) => {
    try {
        return await api.post("/user/signup", data);
    } catch (error) {
        return error.response;
    }
};

export default api;
