import { Link } from "react-router-dom";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import styles from "./index.module.css";

const Header = () => {
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
                    <Link to="/">
                        <ShoppingCartIcon />
                    </Link>
                    <p>0</p>
                </nav>
            </div>
        </header>
    );
};

export default Header;
