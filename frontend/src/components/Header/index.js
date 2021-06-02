import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { cartContext } from "../../contexts/cartContext";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import styles from "./index.module.css";

const Header = () => {
    const { cart } = useContext(cartContext);

    const [cartItems, setCartItems] = useState(cart);

    useEffect(() => {
        setCartItems(cart);
    }, [cart]);

    return (
        <header className={styles.container}>
            <div className={styles.titleContainer}>
                <h1>BookStore</h1>
            </div>

            <div className={styles.navContainer}>
                <nav>
                    <Link to="/">Home</Link>
                    <p>|</p>
                    <Link to="/user">My Account</Link>
                    <p>|</p>
                    <Link to="/cart">
                        <ShoppingCartIcon />
                    </Link>
                    <p>
                        {cartItems.reduce(
                            (previousValue, value) => previousValue + value.qty,
                            0
                        )}
                    </p>
                </nav>
            </div>
        </header>
    );
};

export default Header;
