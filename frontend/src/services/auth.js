import api from "./api";

export const getTokenFromUserDatabase = async () => {
    const { _id: userId } = JSON.parse(localStorage.getItem("userInfo"));

    try {
        const { data: userData } = await api.post("/user/get", { userId })
        
        return userData.token;

    } catch (error) {
        console.log(error)
    } 
}

export const isAuthenticated = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    
    const token = await getTokenFromUserDatabase();

    if (!token || !user) {
        return false;
    }

    return true;
}

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
