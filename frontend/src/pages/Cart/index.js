import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { cartContext } from "../../contexts/CartContext";

import CartItems from "../../components/CartItems";

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
                <CartItems
                    data={cartData}
                    quantityHandler={quantityHandler}
                    removeCartItem={removeCartItem}
                />
            </section>
            <section className={styles.infoCard}>
                <div>
                    <div>
                        <h2>
                            Total (
                            {cartData.reduce(
                                (previousValue, value) =>
                                    previousValue + value.qty,
                                0
                            )}
                            )
                        </h2>
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
                        <Link to={cartData.length > 0 ? "/checkout" : "/cart"}>
                            <button disabled={!cartData.length}>
                                Proceed to checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Cart;
