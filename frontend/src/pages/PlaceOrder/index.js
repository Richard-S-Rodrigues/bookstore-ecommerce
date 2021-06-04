import { Link } from "react-router-dom";

import styles from "./index.module.css";

const PlaceOrder = () => {
    return (
        <main className={styles.container}>
            <section className={styles.productInfoContainer}>
                <div>
                    <h2>Shipping</h2>
                    <p>Address:</p>
                </div>
                <div>
                    <h2>Payment Method</h2>
                    <p>Method:</p>
                </div>
                <div>
                    <h2>Order Items</h2>
                    <ul className={styles.ordersContainer}>
                        <li>
                            <span>
                                <Link to="/placeorder">Clean Code</Link>
                            </span>
                            <span>1 x $200 = $200</span>
                        </li>
                        <li>
                            <span>
                                <Link to="/placeorder">Clean Architeture</Link>
                            </span>
                            <span>1 x $250 = $250</span>
                        </li>
                        <li>
                            <span>
                                <Link to="/placeorder">
                                    Development Patterns
                                </Link>
                            </span>
                            <span>2 x $120 = $240</span>
                        </li>
                    </ul>
                </div>
            </section>
            <section className={styles.productPriceContainer}>
                <div>
                    <div>
                        <h2>Order Price</h2>
                    </div>
                    <div>
                        <span>Books</span>
                        <span>$690</span>
                    </div>
                    <div>
                        <span>Shipping</span>
                        <span>$0.00</span>
                    </div>
                    <div>
                        <span>Tax</span>
                        <span>$30.00</span>
                    </div>
                    <div>
                        <span>Total</span>
                        <span>$720.00</span>
                    </div>
                    <div>
                        <button>Place Order</button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PlaceOrder;
