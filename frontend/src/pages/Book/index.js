import { useEffect, useState } from "react";

import api from "../../services/api";

import styles from "./index.module.css";

const Book = (props) => {
    const { id } = props.match.params;

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [publisher, setPublisher] = useState("");
    const [isbn, setIsbn] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [pagesNumber, setPagesNumber] = useState("");

    const [quantity, setQuantity] = useState(1);

    const getData = async (id) => {
        try {
            const response = await api.get(`/books/${id}`);

            if (!response.status === 200) {
                throw new Error("Book not found!");
            }

            setTitle(response.data.title);
            setAuthor(response.data.author);
            setDescription(response.data.description);
            setPublisher(response.data.publisher);
            setIsbn(response.data.isbn);
            setImage(response.data.image);
            setPrice(response.data.price);
            setPagesNumber(response.data.pagesNumber);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getData(id);
    }, [id]);

    const onChangeHandler = (event) => {
        setQuantity(event.currentTarget.value);
    };

    return (
        <div className={styles.container}>
            <main>
                <section className={styles.infoContainer}>
                    <div className={styles.imgContainer}>
                        <img src={image} alt={title} />
                    </div>
                    <div className={styles.info}>
                        <h1>{title}</h1>

                        <div className={styles.productDetails}>
                            <h2>Product Details:</h2>
                            <ul>
                                <li>
                                    <span className={styles.textBold}>
                                        Author:
                                    </span>
                                    <span>{author}</span>
                                </li>
                                <li>
                                    <span className={styles.textBold}>
                                        Price:
                                    </span>
                                    <span>${price}</span>
                                </li>
                                <li>
                                    <span className={styles.textBold}>
                                        ISBN(10 or 13):
                                    </span>
                                    <span>{isbn}</span>
                                </li>
                                <li>
                                    <span className={styles.textBold}>
                                        Publisher:
                                    </span>
                                    <span>{publisher}</span>
                                </li>
                                <li>
                                    <span className={styles.textBold}>
                                        Pages:
                                    </span>
                                    <span>{pagesNumber}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className={styles.descriptionContainer}>
                    <div>
                        <h2>Description:</h2>
                        <p>{description}</p>
                    </div>
                </section>
                <section className={styles.formContainer}>
                    <form method="POST">
                        <input
                            type="number"
                            min="0"
                            max="99"
                            name="quantity"
                            value={quantity}
                            onChange={onChangeHandler}
                            required="true"
                        />
                        <button type="submit" className="button">
                            Add to cart
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Book;
