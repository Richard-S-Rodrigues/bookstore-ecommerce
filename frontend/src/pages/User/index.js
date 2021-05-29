import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { logout } from "../../services/auth";

import styles from "./index.module.css";

const User = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const [isModal, setIsModal] = useState(false);

    useEffect(() => {
        const { user } = JSON.parse(localStorage.getItem("userInfo"));
        setEmail(user.email);
        setUsername(user.username);
    }, []);

    const history = useHistory();
    const handleLogout = () => {
        logout();
        history.push("/");
    };

    return (
        <>
            <main className={styles.container}>
                <section className={styles.profileContainer}>
                    <div>
                        <div>
                            <span>Name:</span>
                            <span>{username}</span>
                        </div>
                        <div>
                            <span>Email:</span>
                            <span>{email}</span>
                        </div>
                        <div>
                            <button
                                className={styles.logoutBtn}
                                onClick={() => setIsModal(true)}
                            >
                                LOG OUT
                            </button>
                        </div>
                    </div>
                </section>
                <section className={styles.ordersContainer}>
                    <div>
                        <h1>My Orders (0)</h1>
                    </div>
                    <div></div>
                </section>
            </main>
            {isModal && (
                <div className={styles.modalContainer}>
                    <div>
                        <h2>Confirm to Log Out</h2>
                        <form onSubmit={(event) => event.preventDefault()}>
                            <button type="submit" onClick={handleLogout}>
                                YES
                            </button>
                            <button
                                type="submit"
                                onClick={() => setIsModal(false)}
                            >
                                NO
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default User;
