import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { checkAuthentication } from "../../Routes"

import Signin from "../../components/Signin";
import Signup from "../../components/Signup";

const Auth = (props) => {
    const path = props.location.pathname.replace(/\/auth\//, "");
    const [isAuthenticated, seIsAuthenticated] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            const auth = await checkAuthentication();
            seIsAuthenticated(auth)
        }
        checkAuth()
    }, [])

    if (isAuthenticated) {
        return <Redirect  to="/user" />
    }

    return path === "signin" ? (
        <Signin />
    ) : path === "signup" ? (
        <Signup />
    ) : (
        <Redirect to="/" />
    );
};

export default Auth;
