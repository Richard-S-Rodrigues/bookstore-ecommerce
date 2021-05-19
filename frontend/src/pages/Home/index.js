import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import styles from "./index.module.css";

const Home = () => {
    const [books, setBooks] = useState([]);

    const getData = async () => {
        const response = await api.get("/books");
        setBooks(response.data);
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <main className={styles.container}>
            <section className={styles.titleContainer}>
                <h2>Books</h2>
            </section>
            <section className={styles.booksContainer}>
                {books.map((book) => (
                    <div key={book._id}>
                        <img src={book.image} alt={book.title} />
                        <h3>{book.title}</h3>
                        <p>{book.price}</p>
                        <Link to="/">View Details</Link>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default Home;
