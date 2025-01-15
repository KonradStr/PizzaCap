import React, { createContext, useState } from "react";

export const CartVisibilityContext = createContext();

export const CartVisibilityProvider = ({ children }) => {
    const [isCartAvailable, setIsCartAvailable] = useState(true);

    return (
        <CartVisibilityContext.Provider value={{ isCartAvailable, setIsCartAvailable }}>
            {children}
        </CartVisibilityContext.Provider>
    );
};