import api from "./api";

export const isAuthenticated = () => localStorage.getItem("userInfo") !== null;

export const getToken = () => {
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || [];

    return token;
};

export const login = async (data) => {
    try {
        const response = await api.post("/user/signin", data);

        return response;
    } catch (error) {
        return error.response;
    }
};

export const logout = () => {
    localStorage.removeItem("userInfo");
};
