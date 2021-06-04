import { useHistory } from "react-router-dom";

import styles from "./index.module.css";

const Payment = () => {
    const history = useHistory();

    const onSubmitHandler = (event) => {
        event.preventDefault();
        history.push({ pathname: "/placeorder" });
    };

    return (
        <div className={styles.container}>
            <div>
                <h1>Payment Method</h1>
                <form onSubmit={onSubmitHandler}>
                    <fieldset className={styles.methodsContainer}>
                        <legend>Select Method</legend>

                        <div>
                            <span>
                                <input type="radio" id="creditCard" />
                            </span>
                            <label htmlFor="creditCard">
                                <span>Credit Card</span>
                            </label>
                        </div>
                    </fieldset>
                    <button type="submit">Continue</button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
