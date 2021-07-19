import api from "./api";

export const login = async ({ email, password }) => {
    try {
        const response = await api.post("/user/signin", { email, password });

        return response;
        
    } catch (error) {
        return error.response;
    }
};

export const logout = async (refreshToken) => {
    localStorage.removeItem("userInfo");

    try {
        await api.post("/user/signout", { token: refreshToken })

        window.location.reload();

    } catch (error) {
        console.log(error);
    }
};
