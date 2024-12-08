import React, { createContext, useState } from "react";

// Tworzenie kontekstu
export const CartContext = createContext();

// Dostawca kontekstu koszyka
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // Stan koszyka

    // Funkcja dodawania do koszyka
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    // Funkcja usuwania wszystkich elementów z koszyka
    const clearCart = () => {
        setCart([]);
    };

    // Funkcja do przesyłania zamówienia
    const submitOrder = async () => {
        try {
            const response = await fetch("https://example.com/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items: cart }),
            });
            if (response.ok) {
                alert("Zamówienie zostało złożone!");
                clearCart();
            } else {
                alert("Błąd podczas składania zamówienia.");
            }
        } catch (error) {
            console.error("Błąd:", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                clearCart,
                submitOrder,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};