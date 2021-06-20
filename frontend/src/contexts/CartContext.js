import { useState, createContext } from "react";

export const cartContext = createContext([]);

const CartProvider = ({ children }) => {
    const getCart = () => {
        return JSON.parse(localStorage.getItem("cartItems")) || [];
    };

    const [cartData, setCartData] = useState(getCart());

    const setCart = (data) => {
        setCartData(data);
        localStorage.setItem("cartItems", JSON.stringify(data));
    };

    const clearCart = () => {
        localStorage.removeItem('cartItems')
        setCartData([])
    }

    return (
        <cartContext.Provider value={{ cart: cartData, setCart, clearCart }}>
            {children}
        </cartContext.Provider>
    );
};

export default CartProvider;
