import { useContext } from "react";
import { Redirect } from "react-router-dom";

import { userContext } from "../../contexts/UserContext";

import { LoadingBig } from "../../components/Loading";
import Signin from "../../components/Signin";
import Signup from "../../components/Signup";

const Auth = (props) => {
    const path = props.location.pathname.replace(/\/auth\//, "");
    const { isLoggedIn, isLoading } = useContext(userContext);

    if (isLoading) {
        return <LoadingBig />
    }

    if (isLoggedIn) {
        return <Redirect to={props.location.state.from.pathname} />
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
