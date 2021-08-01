import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'

import api from '../../services/api'
import { logout } from "../../services/auth";
import { formatCurrency } from "../../services/utils";
import { userContext, getUserDatabase } from "../../contexts/UserContext";

import { LoadingSmall } from "../../components/Loading";

import styles from "./index.module.css";

const User = () => {
    const { user } = useContext(userContext);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [orders, setOrders] = useState([])

    const [isModal, setIsModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setEmail(user.email);
        setUsername(user.username);

        getOrders(user.email)

    }, [user]);

    const getOrders = async (email) => {
        try {
            const response = await api.post('/orders/get', { email })
            
            setOrders(response.data.orders)

            setIsLoading(false);
        } catch(error) {
            console.log(error)
        }
    }

    const handleLogout = () => {
        getUserDatabase()
         .then( async (data) => {

            return await logout(data.token);
            
         })
          .catch(error => {
            console.log(error);
          })

    };

    const formatDate = (date) => {
        const postDateTemplate = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        const formatedDate = new Date(date).toLocaleDateString(
            'en-US',
            postDateTemplate
        )

        return formatedDate
    }

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
                        <h1>My Orders ({orders.length})</h1>
                    </div>

                    {orders.length > 0 && isLoading && <LoadingSmall />}
                    {orders.length > 0 && (                        
                        <div className={styles.orders}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price/Quantity</th>
                                        <th>Ordered at</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={uuidv4()}>
                                            <td><Link to={`/book/${order.productId}`}>{order.productId}</Link></td>
                                            <td>{order.productName}</td>
                                            <td>{formatCurrency(order.productPrice)} / {order.qty}</td>
                                            <td>{formatDate(order.orderedAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}                    
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
