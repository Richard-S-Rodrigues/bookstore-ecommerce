import { Redirect } from "react-router-dom";

const User = () => {
    const isLoggedIn = false;
    return (
        <>
            {isLoggedIn ? (
                <h1>User Profile</h1>
            ) : (
                <Redirect to="/auth/signin" />
            )}
        </>
    );
};

export default User;
