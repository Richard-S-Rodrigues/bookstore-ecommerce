import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { cartContext } from "../../../contexts/CartContext";

import styles from "./index.module.css";

const Shipping = ({ handleShipping }) => {
    const { cart } = useContext(cartContext);

    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const history = useHistory();
    if (!cart.length) {
        history.push("/");
    }

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;

        switch (name) {
            case "country":
                setCountry(value);
                break;
            case "state":
                setState(value);
                break;
            case "city":
                setCity(value);
                break;
            case "address":
                setAddress(value);
                break;
            case "postalCode":
                setPostalCode(value);
                break;
            default:
                return;
        }
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (!country || !state || !city || !address || !postalCode) return;

        const addressData = {
            country,
            state,
            city,
            line1: address,
            postal_code: postalCode,
        };

        handleShipping(addressData);
    };

    return (
        <main className={styles.container}>
            <div>
                <h1>Shipping</h1>

                <form onSubmit={onSubmitHandler}>
                    <div>
                        <label htmlFor="country">* Country:</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={country}
                            onChange={onChangeHandler}
                            placeholder="e.g., US"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="state">* State:</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={state}
                            onChange={onChangeHandler}
                            placeholder="e.g., CA"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="city">* City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={city}
                            onChange={onChangeHandler}
                            placeholder="e.g., New York"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address">* Street address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={address}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="postalCode">
                            * Postal code(ZIP code):
                        </label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={postalCode}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <button type="submit">Continue</button>
                </form>
            </div>
        </main>
    );
};

export default Shipping;
