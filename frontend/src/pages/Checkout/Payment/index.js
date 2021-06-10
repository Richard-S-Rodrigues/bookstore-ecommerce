import { useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "../CheckoutForm";

import styles from "./index.module.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = ({ handlePayment, addressData }) => {
    const [isOn, setIsOn] = useState(false);

    const addPaymentMethod = async (event) => {
        const { value } = event.target;

        if (value === "on") {
            setIsOn(true);
        }
    };

    return (
        <main className={styles.container}>
            <div>
                <h1>Payment Method</h1>

                <fieldset className={styles.methodsContainer}>
                    <legend>Select Method</legend>

                    <div>
                        <span>
                            <input
                                type="radio"
                                id="creditCard"
                                name="creditCard"
                                onClick={addPaymentMethod}
                            />
                        </span>
                        <label htmlFor="creditCard">
                            <span>Credit Card</span>
                        </label>
                    </div>
                </fieldset>

                {isOn && (
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            addressData={addressData}
                            handlePayment={handlePayment}
                        />
                    </Elements>
                )}
            </div>
        </main>
    );
};

export default Payment;
