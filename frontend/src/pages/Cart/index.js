import { useEffect, useState, useContext } from "react";
import { loadStripe } from '@stripe/stripe-js';

import { cartContext } from "../../contexts/CartContext";
import { userContext } from "../../contexts/UserContext";

import CartItems from "../../components/CartItems";

import api from '../../services/api'
import { formatCurrency } from "../../services/utils"

import styles from "./index.module.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Cart = () => {
    const { cart, setCart } = useContext(cartContext);
    const { user } = useContext(userContext);

    const [cartData, setCartData] = useState(cart);
    const [lineItems, setLineItems] = useState([])
    const [customerId, setCustomerId] = useState('')

    useEffect(() => {
        // Save In LocalStorage
        setCart(cartData);
    }, [cartData, setCart]);

    useEffect(() => {
        setLineItems([])
        
        cartData.forEach(item => {
            setLineItems(items => ([
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.productName
                        },
                        unit_amount: item.productPrice
                    },
                    quantity: item.qty
                },
                ...items
            ]))
        })
    }, [cartData])

    
    useEffect(() => {
        const getCustomer = async () => {
            try {
                const response = await api.post('/stripe/getCustomer', { email: user.email })
            
                setCustomerId(response.data.customerId)

            } catch(error) {
                return;
            }
        }

        getCustomer()

    }, [user.email])

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

        const { data: session } = await api.post('/stripe/create-checkout-session', {
            lineItems,
            customerId 
        })

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
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
                            {cartData
                                .reduce(
                                    (previousValue, value) =>
                                        formatCurrency(
                                        previousValue +
                                        value.productPrice * value.qty),
                                    0
                                )
                            }
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
