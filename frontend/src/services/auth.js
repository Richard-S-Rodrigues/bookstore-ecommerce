import api from "./api";

export const isAuthenticated = () => localStorage.getItem("TOKEN_KEY") !== null;

export const getToken = () => localStorage.getItem("TOKEN_KEY");

export const login = async (data) => {
    try {
        const response = await api.post("/user/signin", data);

        return response;
    } catch (error) {
        return error.response;
    }
};

export const logout = () => {
    localStorage.removeItem("TOKEN_KEY");
};
