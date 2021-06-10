import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { login } from "../../services/auth";

import ErrorComponent from "../Error";

import styles from "./index.module.css";

const Signin = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;

        if (name === "email") {
            setUserEmail(value);
        }

        if (name === "password") {
            setUserPassword(value);
        }
    };

    const history = useHistory();
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const response = await login({
            email: userEmail,
            password: userPassword,
        });

        if (response.status !== 200) {
            setError(response.data.message);
            setIsError(true);
        } else {
            // Pass all necessary data to 'userData'
            const { password, createdAt, ...userData } = response.data.user;
            const data = { user: userData, token: response.data.token };

            localStorage.setItem("userInfo", JSON.stringify(data));
            history.push("/user");
        }
    };
    return (
        <>
            {isError && <ErrorComponent>{error}</ErrorComponent>}
            <div className={styles.container}>
                <main>
                    <header>
                        <h2>Sign In</h2>
                    </header>

                    <form method="POST" onSubmit={onSubmitHandler}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={userEmail}
                                onChange={onChangeHandler}
                                required={true}
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={userPassword}
                                onChange={onChangeHandler}
                                required={true}
                            />
                        </div>

                        <div className={styles.actionContainer}>
                            <button type="submit">Sign In</button>
                        </div>
                        <div>
                            <p>
                                Don't have an account?{" "}
                                <Link to="/auth/signup">Sign Up</Link>
                            </p>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
};

export default Signin;
