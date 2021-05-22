import { Link } from "react-router-dom";

import styles from "./index.module.css";

const BookList = ({ books }) =>
    books.map((book) => (
        <div className={styles.container} key={book._id}>
            <img src={book.image} alt={book.title} />
            <div>
                <h3>{book.title}</h3>
                <p>${book.price}</p>
            </div>

            <Link to={`/book/${book._id}`} className="button">
                View Details
            </Link>
        </div>
    ));

export default BookList;
