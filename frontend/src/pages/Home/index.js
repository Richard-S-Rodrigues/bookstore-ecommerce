import { useContext } from "react";

import { booksContext } from "../../contexts/BooksContext";

import { LoadingBig } from "../../components/Loading";
import BookList from "../../components/BookList";

import styles from "./index.module.css";

const Home = () => {
    const { books, isLoading } = useContext(booksContext);

    return (
        <main className={styles.container}>
            <section className={styles.titleContainer}>
                <h1>Latest Books</h1>
            </section>
            <section className={styles.booksContainer}>
                {isLoading && <LoadingBig />}
                <BookList books={books} />
            </section>
        </main>
    );
};

export default Home;
