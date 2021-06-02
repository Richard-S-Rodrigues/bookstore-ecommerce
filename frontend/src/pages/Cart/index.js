import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { cartContext } from "../../contexts/CartContext";

import DeleteIcon from "@material-ui/icons/Delete";

import styles from "./index.module.css";

const Cart = () => {
    const { cart, setCart } = useContext(cartContext);

    const [cartData, setCartData] = useState(cart);

    useEffect(() => {
        // Save In LocalStorage
        setCart(cartData);
    }, [cartData, setCart]);

    const removeCartItem = (index) => {
        const newData = [...cartData];

        newData.splice(index, 1);

        setCartData(newData);
    };

    const quantityHandler = (event, productId, index) => {
        const productInCart = cartData.find(
            (item) => item.productId === productId
        );

        let updatedData;
        if (event.target.textContent === "-") {
            updatedData = Object.assign({
                ...productInCart,
                qty:
                    productInCart.qty > 1
                        ? productInCart.qty - 1
                        : productInCart.qty,
            });
        }
        if (event.target.textContent === "+") {
            updatedData = Object.assign({
                ...productInCart,
                qty: productInCart.qty + 1,
            });
        }

        const data = [...cartData];
        data[index] = updatedData;
        setCartData(data);
    };

    return (
        <main className={styles.container}>
            <section className={styles.itemsContainer}>
                <div>
                    {!cartData.length ? (
                        <p>No items found!</p>
                    ) : (
                        cartData.map((value, index) => {
                            return (
                                <div
                                    key={value.productId}
                                    className={styles.item}
                                >
                                    <div>
                                        <div className={styles.imgContainer}>
                                            <img
                                                src={value.productImage}
                                                alt={value.productName}
                                            />
                                        </div>
                                        <div className={styles.productName}>
                                            <Link
                                                to={`/book/${value.productId}`}
                                            >
                                                {value.productName}
                                            </Link>
                                        </div>
                                        <div className={styles.price}>
                                            $
                                            {(
                                                value.qty * value.productPrice
                                            ).toFixed(2)}
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                onClick={(event) =>
                                                    quantityHandler(
                                                        event,
                                                        value.productId,
                                                        index
                                                    )
                                                }
                                            >
                                                -
                                            </button>

                                            {value.qty}

                                            <button
                                                type="submit"
                                                onClick={(event) =>
                                                    quantityHandler(
                                                        event,
                                                        value.productId,
                                                        index
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div>
                                            <span
                                                onClick={() =>
                                                    removeCartItem(index)
                                                }
                                                style={{
                                                    cursor: "pointer",
                                                    height: "1.5em",
                                                }}
                                            >
                                                <DeleteIcon />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </section>
            <section className={styles.infoCard}>
                <div>
                    <div>
                        <h2>Total ({cartData.length})</h2>
                        <small>
                            $
                            {cartData
                                .reduce(
                                    (previousValue, value) =>
                                        previousValue +
                                        value.productPrice * value.qty,
                                    0
                                )
                                .toFixed(2)}
                        </small>
                    </div>
                    <div>
                        <button>Proceed to checkout</button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Cart;
