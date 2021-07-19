import { useContext } from "react";
import { Redirect } from "react-router-dom";

import { userContext } from "../../contexts/UserContext";

import Signin from "../../components/Signin";
import Signup from "../../components/Signup";

const Auth = (props) => {
    const path = props.location.pathname.replace(/\/auth\//, "");
    const { isLoggedIn } = useContext(userContext);

    if (isLoggedIn) {
        return <Redirect to="/user" />
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
