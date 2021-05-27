import api from "./api";
import { getToken } from "./auth";

const getUser = async () => {
    try {
        const token = await getToken();
        const response = await api.post("/user", { token });

        if (response.status !== 200) {
            throw new Error("User not found!");
        }

        const { user } = response.data;

        return user;
    } catch (error) {
        console.log("error", error);
    }
};

export default getUser;
