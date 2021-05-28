import { Link } from "react-router-dom";

import styles from "./index.module.css";

const BookList = ({ books }) =>
    books.map((book) => (
        <div className={styles.container} key={book._id}>
            <div>
                <Link to={`/book/${book._id}`} className={styles.imgContainer}>
                    <img src={book.image} alt={book.title} />
                </Link>

                <div className={styles.infoContainer}>
                    <Link to={`/book/${book._id}`}>
                        <div>
                            <strong className={styles.bookTitle}>
                                {book.title}
                            </strong>
                        </div>
                    </Link>

                    <h3>${book.price}</h3>
                </div>
            </div>
        </div>
    ));

export default BookList;
