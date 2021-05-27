import styles from "./index.module.css";

const ErrorComponent = ({ errorMessage }) => (
    <div className={styles.container}>
        <p>{errorMessage}</p>
    </div>
);

export default ErrorComponent;
