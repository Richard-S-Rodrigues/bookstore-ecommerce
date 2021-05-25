import { Redirect } from "react-router-dom";

import Signin from "../../components/Signin";
import Signup from "../../components/Signup";

const Auth = (props) => {
    const path = props.location.pathname.replace(/\/auth\//, "");

    return path === "signin" ? (
        <Signin />
    ) : path === "signup" ? (
        <Signup />
    ) : (
        <Redirect to="/" />
    );
};

export default Auth;
