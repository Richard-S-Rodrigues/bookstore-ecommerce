import { createContext, useState, useEffect, useCallback } from "react";

import api from "../services/api";

export const userContext = createContext({})

const UserProvider = ({ children }) => {
	const user = JSON.parse(localStorage.getItem("userInfo"));
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const getTokenFromUserDatabase = useCallback(async () => {
		if (!user) return;

	    const { _id: userId } = user;

	    try {
	        const { data: userData } = await api.post("/user/get", { userId })
	        
	        return userData.token;

	    } catch (error) {
	        console.error(error)
	    } 
	}, [user])


	useEffect(() => {
		const isAuthenticated = async () => {	    
		    const token = await getTokenFromUserDatabase();

		    if (!token || !user) {
		        setIsLoggedIn(false);
		        return;
		    }

		    setIsLoggedIn(true);
		}
		isAuthenticated();

	}, [getTokenFromUserDatabase, user])

	return (
		<userContext.Provider value={{ isLoggedIn, user, getTokenFromUserDatabase }}>
			{ children }
		</userContext.Provider>
	)
};

export default UserProvider;