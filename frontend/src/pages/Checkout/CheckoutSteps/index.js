import { Link } from "react-router-dom";

import styles from "./index.module.css";

const CheckoutSteps = ({ shipping, payment, placeOrder, returnStep }) => (
    <nav className={styles.container}>
        <div>
            {shipping === "disabled" ? (
                <Link
                    to={window.location.pathname}
                    style={{ cursor: "default" }}
                >
                    Shipping
                </Link>
            ) : shipping ? (
                <Link
                    to="/checkout"
                    className={styles.actived}
                    onClick={() => returnStep("shipping")}
                >
                    Shipping
                </Link>
            ) : (
                <Link to="/checkout" onClick={() => returnStep("shipping")}>
                    Shipping
                </Link>
            )}
        </div>
        <div>
            {payment === "disabled" ? (
                <Link
                    to={window.location.pathname}
                    style={{ cursor: "default" }}
                >
                    Payment
                </Link>
            ) : payment ? (
                <Link
                    to="/checkout"
                    className={styles.actived}
                    onClick={() => returnStep("payment")}
                >
                    Payment
                </Link>
            ) : (
                <Link to="/checkout" onClick={() => returnStep("payment")}>
                    Payment
                </Link>
            )}
        </div>
        <div>
            {placeOrder === "disabled" ? (
                <Link
                    to={window.location.pathname}
                    style={{ cursor: "default" }}
                >
                    Place order
                </Link>
            ) : placeOrder ? (
                <Link
                    to="/checkout"
                    className={styles.actived}
                    onClick={() => returnStep("placeOrder")}
                >
                    Place order
                </Link>
            ) : (
                <Link to="/checkout" onClick={() => returnStep("placeOrder")}>
                    Place order
                </Link>
            )}
        </div>
    </nav>
);

export default CheckoutSteps;
