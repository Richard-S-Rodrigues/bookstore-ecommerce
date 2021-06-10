import { useState } from "react";

import CheckoutSteps from "./CheckoutSteps";

import Shipping from "./Shipping";
import Payment from "./Payment";
import PlaceOrder from "./PlaceOrder";

import api from "../../services/api";

const Checkout = () => {
    const [checkoutStep, setCheckoutStep] = useState("shipping");
    const [addressData, setAddressData] = useState({});

    const createOrderSession = async (orderInfo) => {
        try {
            const response = await api.post(
                "/checkout/create-order",
                orderInfo
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    const handleShipping = (data) => {
        setAddressData(data);

        setCheckoutStep("payment");
    };

    const handlePayment = (orderInfo) => {
        createOrderSession(orderInfo);
        /* setCheckoutStep("placeOrder"); */
    };

    const handlePlaceOrder = () => {
        console.log("place order");
    };

    const returnStep = (value) => {
        setCheckoutStep(value);
    };

    return (
        <div>
            {checkoutStep === "shipping" && (
                <>
                    <CheckoutSteps
                        shipping
                        payment={"disabled"}
                        placeOrder={"disabled"}
                        returnStep={returnStep}
                    />

                    <Shipping handleShipping={handleShipping} />
                </>
            )}
            {checkoutStep === "payment" && (
                <>
                    <CheckoutSteps
                        payment
                        placeOrder={"disabled"}
                        returnStep={returnStep}
                    />

                    <Payment
                        addressData={addressData}
                        handlePayment={handlePayment}
                    />
                </>
            )}
            {checkoutStep === "placeOrder" && (
                <>
                    <CheckoutSteps placeOrder returnStep={returnStep} />

                    <PlaceOrder handlePlaceOrder={handlePlaceOrder} />
                </>
            )}
        </div>
    );
};

export default Checkout;
