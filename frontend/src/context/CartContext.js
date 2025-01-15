import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import DishCard from "../components/DishCard";

// Tworzenie kontekstu
export const CartContext = createContext();

// Dostawca kontekstu koszyka
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // Stan koszyka
    const [cartId, setCartId] = useState(null);



    // Funkcja do utworzenia nowego koszyka w API
    const createCartInAPI = async () => {
        try {
            const response = await fetch("http://localhost:8080/cart/getID");
            const data = await response.json();
            console.log(data);
            setCartId(data);
            return data;
        } catch (error) {
            console.error("Błąd tworzenia koszyka w API:", error);
        }
    };

    const syncCartWithAPI = async (itemId, itemSizeId, quantity, newCartId, itemName, itemSize) => {
        try {
            console.log("itemId:", itemId)
            if (cartId) {
                console.log("request", itemId, itemSizeId, quantity, itemName, itemSize);
                await fetch(`http://localhost:8080/cart/${cartId}/items/${itemId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({quantity, itemSizeId, itemName, itemSize}),
                });
            }else if(newCartId){
                await fetch(`http://localhost:8080/cart/${newCartId}/items/${itemId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({quantity, itemSizeId, itemName, itemSize}),
                });
            }
        } catch (error) {
            console.error("Błąd synchronizacji koszyka:", error);
        }
    };



    const checkAndSetCartId = async (existingCartId) =>{
        try {
            const response = await fetch(`http://localhost:8080/cart/${existingCartId}`);
            const data = response.text();
            if((await data).length === 0){
                localStorage.removeItem("cartId");
                setCartId(null);
            }else{
                const cartData = JSON.parse((await data).replace(/,$/, ''));
                console.log(cartData.items);
                console.log("pobrano", cartData.items);
                setCart(cartData.items);

            }
        }catch (error){
            console.error("Błąd pobierania koszyka")
        }
    }

    // Funkcja dodawania do koszyka
    const addToCart = async (item) => {
        let newCartId = null;
        console.log(cartId);
        if (!cartId) {
            console.log("brak cartID")
            // Jeśli brak `cartId`, utwórz nowy koszyk
            newCartId = await createCartInAPI();
            setCartId(newCartId);
            localStorage.setItem("cartId", newCartId)
            if (!newCartId) {
                console.error("Nie udało się utworzyć koszyka");
                return;
            }
        }

        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (cartItem) => cartItem.id === item.id && cartItem.size === item.size
            );
            if (existingItemIndex !== -1) {
                const updatedCart = [...prevCart];
                if(updatedCart[existingItemIndex].quantity >= 10){
                    alert("Maksymalna ilość produktu to 10");
                }else {
                    updatedCart[existingItemIndex].quantity += 1;
                    console.log("ben")
                    syncCartWithAPI(item.id, item.sizeId, updatedCart[existingItemIndex].quantity, newCartId, item.name, item.size);
                    console.log("ben")
                }
                return updatedCart;
            } else {
                console.log("ben2");
                syncCartWithAPI(item.id, item.sizeId, 1, newCartId, item.name, item.size);
                console.log("ben2");
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };



    const increaseQuantity = (itemId, sizeId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) => {
                if (item.id === itemId && item.sizeId === sizeId) {
                    const newQuantity = item.quantity + 1;
                    syncCartWithAPI(itemId, item.sizeId, newQuantity, item.name, item.size);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            return updatedCart;
        });
    };

    // Zmniejszanie ilości produktu
    const decreaseQuantity = (itemId, sizeId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart
                .map((item) => {
                    if (item.id === itemId && item.sizeId === sizeId) {
                        const newQuantity = item.quantity - 1;
                        if (newQuantity <= 0) {
                            syncCartWithAPI(itemId, item.sizeId, 0); // Usunięcie z API
                            return null; // Usunięcie lokalnie
                        } else {
                            syncCartWithAPI(itemId, item.sizeId, newQuantity, item.name, item.size);
                            return { ...item, quantity: newQuantity };
                        }
                    }
                    return item;
                })
                .filter(Boolean); // Usuwa `null` z tablicy
            return updatedCart;
        });
    };

    useEffect(() => {
        const existingCartId = localStorage.getItem("cartId");
        if (existingCartId) {
            setCartId(existingCartId);
            checkAndSetCartId(existingCartId);
        }
    }, []);

    // Zmniejsz ilość
    const decrementQuantity = (itemId, size) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === itemId && item.size === size
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0) // Usuwamy produkty z ilością 0
        );
    };

    // Funkcja usuwania wszystkich elementów z koszyka
    const clearCart = () => {
        setCart([]);
        setCartId(null);
        localStorage.removeItem('cartId')
    };

    // Funkcja do przesyłania zamówienia


    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                setCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};