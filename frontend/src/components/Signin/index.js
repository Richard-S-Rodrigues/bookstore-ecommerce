import { useState } from "react";
import { Link } from "react-router-dom";

import { login } from "../../services/api";

import styles from "./index.module.css";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;

        if (name === "email") {
            setEmail(value);
        }

        if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        login({ email, password });
    };
    return (
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
                            value={email}
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
                            value={password}
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
    );
};

export default Signin;
