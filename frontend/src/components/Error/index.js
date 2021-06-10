import styles from "./index.module.css";

const ErrorComponent = ({ children }) => (
    <div className={styles.container}>
        <p>{children}</p>
    </div>
);

export default ErrorComponent;
