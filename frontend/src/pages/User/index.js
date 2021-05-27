import { useState, useEffect } from "react";

import getUser from "../../services/getUser";

const User = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const getData = async () => {
        const user = await getUser();

        setEmail(user.email);
        setUsername(user.username);
    };
    useEffect(() => {
        getData();
    });

    return (
        <>
            <h1>User Profile</h1>
            <p>Email: {email}</p>
            <p>Name: {username}</p>
        </>
    );
};

export default User;
