import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/",
});

export const createUser = async (data) => {
    try {
        return await api.post("/user/signup", data);
    } catch (error) {
        return error.response;
    }
};

export const login = (data) => {
    return api
        .post("/user/signin", data)
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            const { message } = error.response.data;
            console.log(message);
        });
};

export default api;
