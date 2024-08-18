'use client';
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const CartWrapper = ({ children }: { children: React.ReactNode }) => {
    const cartStore = useSelector((state: any) => state.cartStore);
    const [carts, setCarts] = React.useState([]);
    useEffect(() => {
        const cartsLocalStorage = localStorage.getItem("@cart");
        const carts = cartsLocalStorage ? JSON.parse(cartsLocalStorage) : [];
        setCarts(carts);
    }, [cartStore])
    return (
        carts.length > 0 ? (<div className="relative inline-block">
            <div className="absolute top-0 right-0 bg-red-500 text-white font-medium rounded-full text-xs w-3 h-3 flex items-center justify-center">
                {carts.length}
            </div>
            {children}
        </div>) : <>{children}</>
    );
}

export default CartWrapper;
