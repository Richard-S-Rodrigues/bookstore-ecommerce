import { useContext, useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { cartContext } from "../../../contexts/CartContext";

import ErrorComponent from "../../../components/Error";

import api from "../../../services/api";

import styles from "./index.module.css";

const CheckoutForm = ({ handlePayment, addressData }) => {
    const { cart } = useContext(cartContext);
    const { user } = JSON.parse(localStorage.getItem("userInfo"));

    const [items, setItems] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        cart.forEach((item) => {
            setItems((itemsData) => [
                {
                    amount: Number(item.productPrice) * 100,
                    description: item.productName,
                    quantity: item.qty,
                },
                ...itemsData,
            ]);
        });
    }, [cart]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const orderInfo = {
            customer: user._id,
            email: user.email,
            shipping: {
                address: addressData,
                name: user.username,
            },

            items,
        };

        handlePayment(orderInfo);
    };

    const cardOptions = {
        style: {
            base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                    color: "#aab7c4",
                },
            },
            invalid: {
                color: "#9e2146",
            },
        },
    };

    return (
        <>
            {isError && <ErrorComponent>{errorMessage}</ErrorComponent>}
            <form onSubmit={handleSubmit} className={styles.container}>
                <CardElement options={cardOptions} />
                <button type="submit" disabled={!stripe}>
                    Continue
                </button>
            </form>
        </>
    );
};

export default CheckoutForm;
