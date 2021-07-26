import { createContext, useState, useEffect } from "react";

import api from "../services/api";

export const userContext = createContext({})

export const getTokenFromUserDatabase = async () => {
	const user = JSON.parse(localStorage.getItem("userInfo"));

	if (!user) return;

    const { _id: userId } = user;

    try {
        const { data: userData } = await api.post("/user/get", { userId })
        
        return userData.token;

    } catch (error) {
        console.error(error)
    } 
}
const UserProvider = ({ children }) => {
	const user = JSON.parse(localStorage.getItem("userInfo"));
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const isAuthenticated = async () => {	    
		    const token = await getTokenFromUserDatabase();

		    if (!token) {
		        setIsLoggedIn(false);
		        return;
		    }

		    setIsLoggedIn(true);
		}
		isAuthenticated();

	}, [user])

	return (
		<userContext.Provider value={{ isLoggedIn, user }}>
			{ children }
		</userContext.Provider>
	)
};

export default UserProvider;