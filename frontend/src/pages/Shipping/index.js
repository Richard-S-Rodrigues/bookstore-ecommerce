import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { cartContext } from "../../contexts/CartContext";

import styles from "./index.module.css";

const Shipping = () => {
    const { cart } = useContext(cartContext);

    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const history = useHistory();

    if (!cart.length) {
        history.push("/");
    }

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;

        switch (name) {
            case "address":
                setAddress(value);
                break;
            case "country":
                setCountry(value);
                break;
            case "city":
                setCity(value);
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

        history.push({ pathname: "/payment" });
    };

    return (
        <div className={styles.container}>
            <div>
                <h1>Shipping</h1>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={onChangeHandler}
                            placeholder="Enter Address"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="country"
                            value={country}
                            onChange={onChangeHandler}
                            placeholder="Enter Country"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="city"
                            value={city}
                            onChange={onChangeHandler}
                            placeholder="Enter City"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="postalCode"
                            value={postalCode}
                            onChange={onChangeHandler}
                            placeholder="Enter postal code"
                        />
                    </div>
                    <button type="submit">Continue</button>
                </form>
            </div>
        </div>
    );
};

export default Shipping;
