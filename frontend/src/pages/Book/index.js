import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/api";
import { formatNumber, formatCurrency } from "../../services/utils"
import { cartContext } from "../../contexts/CartContext";

import styles from "./index.module.css";

const Book = (props) => {
    const { id } = props.match.params;
    const { cart, setCart } = useContext(cartContext);

    const [cartData, setCartData] = useState(cart);
    const [isMounted, setIsMounted] = useState(false);

    const history = useHistory();
    useEffect(() => {
        // Save In LocalStorage
        setCart(cartData);

        if (isMounted) {
            history.push("/cart");
        }
    }, [cartData, isMounted, history, setCart]);

    useEffect(() => {
        getData(id);
    }, [id]);

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
            setImage(response.data.image.filepath);
            setPrice(formatNumber(response.data.price));
            setPagesNumber(response.data.pagesNumber);
        } catch (error) {
            console.error(error);
        }
    };

    const onChangeHandler = (event) => {
        setQuantity(event.currentTarget.value);
    };

    const addToCart = () => {
        const items = cartData;

        if (parseInt(quantity) <= 0) return;

        const newItem = {
            productId: id,
            productName: title,
            productImage: image,
            productPrice: price,
            qty: parseInt(quantity),
        };

        const productInCart = items.find(
            (item) => item.productId === newItem.productId
        );

        if (productInCart) {
            const updatedItems = Object.assign({
                ...productInCart,
                qty: productInCart.qty + newItem.qty,
            });
            setCartData(updatedItems);
        } else {
            setCartData([newItem, ...items]);
        }

        setIsMounted(true);
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
                                    <span>{formatCurrency(price)}</span>
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
                    <form
                        method="POST"
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <input
                            type="number"
                            min="1"
                            max="99"
                            name="quantity"
                            value={quantity}
                            onChange={onChangeHandler}
                            required={true}
                        />
                        <button type="submit" onClick={addToCart}>
                            Add to cart
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Book;
