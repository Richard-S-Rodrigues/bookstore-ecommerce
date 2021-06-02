import { createContext, useEffect, useState } from "react";

import api from "../services/api";

export const booksContext = createContext([]);

const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);

    const getData = async () => {
        const response = await api.get("/books");
        setBooks(response.data);
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <booksContext.Provider value={{ books }}>
            {children}
        </booksContext.Provider>
    );
};

export default BooksProvider;
