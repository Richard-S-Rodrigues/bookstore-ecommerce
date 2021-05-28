import { useEffect, useState } from "react";

import BookList from "../../components/BookList";

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
                <h1>Latest Books</h1>
            </section>
            <section className={styles.booksContainer}>
                <BookList books={books} />
            </section>
        </main>
    );
};

export default Home;
