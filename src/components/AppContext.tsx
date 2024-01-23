'use client'

import React, { createContext, ReactNode, useState } from "react";
import { SessionProvider } from "next-auth/react";

interface CartContextProps {
    cartProducts: any[];
    setCartProducts: React.Dispatch<React.SetStateAction<any[]>>;
    addToCart: (product: any, size?: any, extras?: any[] | undefined) => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [cartProducts, setCartProducts] = useState<any[]>([]);

    function addToCart(product: any, size: any = null, extras: any[] | undefined = []) {
        setCartProducts((prevProduct) => {
            const cartProducts = { ...product, size, extras };
            const newProducts = [...prevProduct, cartProducts];
            return newProducts;
        });
    }

    return (
        <SessionProvider>
            <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    );
}
