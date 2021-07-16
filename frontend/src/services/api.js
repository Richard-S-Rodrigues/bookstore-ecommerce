import axios from "axios";

import { getTokenFromUserDatabase, logout } from "./auth";

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: "http://localhost:3333",
});

api.interceptors.response.use((config) => {
    return config;

}, async (err) => {
    const error = err.response;
    const token = await getTokenFromUserDatabase()

    // If access token expired, refresh token
    if (error.status === 401 && error.config && !error.config.__isRetryRequest) {

        return api.post("/refreshToken", { token }).then(res => {
            error.config.__isRetryRequest = true;
            return axios(error.config);
        })
        .catch(error => console.log(error))
    
    }

    // If refresh token expired, logout user
    if (error.status === 403 && error.config && !error.config.__isRetryRequest) {
        
        return logout(token).then(res => {

            error.config.__isRetryRequest = true;
            return axios(error.config);
        })
        .catch(error => console.log(error))

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
