import { useEffect, useState, useContext } from "react";
import { loadStripe } from '@stripe/stripe-js';

import { cartContext } from "../../contexts/CartContext";

import CartItems from "../../components/CartItems";

import api from '../../services/api'

import styles from "./index.module.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Cart = () => {
    const { cart, setCart } = useContext(cartContext);

    const [cartData, setCartData] = useState(cart);
    const [lineItems, setLineItems] = useState([])

    useEffect(() => {
        // Save In LocalStorage
        setCart(cartData);
    }, [cartData, setCart]);

    useEffect(() => {
        cart.forEach(item => {
            setLineItems(items => ([
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.productName
                        },
                        unit_amount: Number(item.productPrice) * 100
                    },
                    quantity: item.qty
                },
                ...items
            ]))
        })
    }, [cart])

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

    const checkoutHandler = async () => {
        const stripe = await stripePromise

        const { data: session } = await api.post('/checkout/create-checkout-session', { line_items: lineItems })

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        })

        if (result.error) {
            console.log(result.error.message)
        }
    }

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
                        
                        <button disabled={!cartData.length} onClick={checkoutHandler}>
                            Proceed to checkout
                        </button>
                        
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Cart;
