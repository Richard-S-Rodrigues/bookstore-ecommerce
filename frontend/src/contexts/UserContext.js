import { createContext, useState, useEffect } from "react";

import api from "../services/api";

export const userContext = createContext({})

export const getUserDatabase = async () => {
	const user = JSON.parse(localStorage.getItem("userInfo"));

	if (!user) return;

    const { _id: userId } = user;

    try {
        const { data: userData } = await api.post("/user/get", { userId })
        
        if (!userData) {
        	throw new Error("User data not found!")
        }

        return {
        	token: userData.token,
        	role: userData.role
        }

    } catch (error) {
        console.error(error)
    } 
}
const UserProvider = ({ children }) => {
	const user = JSON.parse(localStorage.getItem("userInfo"));
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const isAuthenticated = async () => {	    
		    const data = await getUserDatabase();

		    if (!data) {
		    	setIsLoading(false);
		    	return;
		    }

		    if (!data.token) {
		        setIsLoggedIn(false);
		    }
		    
		    setIsLoggedIn(true);

		    if (data.role === "admin") {
		    	setIsAdmin(true);
		    } else {
		    	setIsAdmin(false);
		    }

		    setIsLoading(false);
		}

		isAuthenticated();

	}, [])


	return (
		<userContext.Provider value={{ isLoggedIn, isAdmin, isLoading, user }}>
			{ children }
		</userContext.Provider>
	)
};

export default UserProvider;