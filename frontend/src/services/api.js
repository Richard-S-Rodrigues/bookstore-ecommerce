import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: "http://localhost:3333",
});

api.interceptors.request.use(async(config) => {
    const response = await api.get("/getRefreshToken")
    console.log(response.data)
    return config;
}, (error) => {
    return Promise.reject(error)
})

export const createUser = async (data) => {
    try {
        return await api.post("/user/signup", data);
    } catch (error) {
        return error.response;
    }
};

export default api;
