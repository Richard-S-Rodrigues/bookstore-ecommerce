import { createContext, useEffect, useState, useCallback } from "react";

import api from "../services/api";

export const booksContext = createContext([]);

const BooksProvider = ({ children }) => {
    const [booksData, setBooksData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getBooks = async () => {
        try {
            const response = await api.get("/books");
            return response.data;  
        } catch(error) {
            return []
        }
    }

    const setBooks = useCallback(async () => {
        const books = await getBooks()
        setBooksData(books);

        setIsLoading(false);
    }, []);

    useEffect(() => {
        setBooks()
    }, [setBooks]);


    return (
        <booksContext.Provider value={{ books: booksData, setBooks, getBooks, isLoading }}>
            {children}
        </booksContext.Provider>
    );
};

export default BooksProvider;
