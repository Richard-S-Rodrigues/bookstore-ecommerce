import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import api, { createUser } from "../../services/api";
import ErrorComponent from "../Error";

import styles from "./index.module.css";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;
      
        switch(name) {
            case 'email':
                setEmail(value);
            break;
            case 'username':
                setUsername(value);
            break;
            case 'password':
                setPassword(value.trim());
            break;
            case 'confirmPassword':
                setConfirmPassword(value.trim())
            break;
            default:
                return;
        }
        
    };

    const history = useHistory();
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("'Password' and 'Confirm password' doesn't match!")
            setIsError(true)
            return;
        }

        const response = await createUser({ email, password, username });

        if (response.status !== 201) {
            setError(response.data.message);
            setIsError(true);
        } else {
            history.push("/auth/signin");

            createStripeCustomer()
        }
    };

    const createStripeCustomer = async () => {
        try {
            await api.post('/stripe/createCustomer', { email, name: username })
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <>
            {isError && <ErrorComponent>{error}</ErrorComponent>}
            <div className={styles.container}>
                <main>
                    <header>
                        <h2>Create Account</h2>
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
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={username}
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
                        <div>
                            <label htmlFor="confirmPassword">Confirm password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={onChangeHandler}
                                required={true}
                            />
                        </div>

                        <div className={styles.actionContainer}>
                            <button type="submit">Create Account</button>
                        </div>
                        <div>
                            <p>
                                Already have an account?{" "}
                                <Link to="/auth/signin">Sign In</Link>
                            </p>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
};

export default Signup;
