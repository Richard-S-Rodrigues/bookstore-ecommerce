import { Link } from "react-router-dom";

import { formatCurrency } from "../../services/utils";

import DeleteIcon from "@material-ui/icons/Delete";

import styles from "./index.module.css";

const CartItems = ({ data, quantityHandler, removeCartItem }) =>
    !data.length ? (
        <div className={styles.emptyCart}>
            <h1>Shopping Cart</h1>
            <p>
                Your cart is empty! <Link to="/">Go Back!</Link>
            </p>
        </div>
    ) : (
        data.map((value, index) => {
            const {
                productId,
                productImage,
                productName,
                qty: quantity,
                productPrice,
            } = value;

            return (
                <div key={productId} className={styles.item}>
                    <div className={styles.imgContainer}>
                        <img src={productImage} alt={productName} />
                    </div>
                    <div className={styles.titleAndPriceContainer}>
                        <div>
                            <Link to={`/book/${productId}`}>{productName}</Link>
                        </div>
                        <div>{formatCurrency(quantity * productPrice)}</div>
                    </div>

                    <div className={styles.actionsContainer}>
                        <div>
                            <button
                                type="submit"
                                onClick={(event) =>
                                    quantityHandler(event, productId, index)
                                }
                            >
                                -
                            </button>

                            {quantity}

                            <button
                                type="submit"
                                onClick={(event) =>
                                    quantityHandler(event, productId, index)
                                }
                            >
                                +
                            </button>
                        </div>

                        <span onClick={() => removeCartItem(index)}>
                            <DeleteIcon />
                        </span>
                    </div>
                </div>
            );
        })
    );

export default CartItems;
