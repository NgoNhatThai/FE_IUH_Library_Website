'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Account = ({ children }: { children: React.ReactNode }) => {
  const cartStore = useSelector((state: any) => state.cartStore);
  const [carts, setCarts] = React.useState([]);
  useEffect(() => {
    const cartsLocalStorage = localStorage.getItem('@cart');
    const carts = cartsLocalStorage ? JSON.parse(cartsLocalStorage) : [];
    setCarts(carts);
  }, [cartStore]);
  return carts.length > 0 ? (
    <div className="relative inline-block">
      <div className="absolute right-0 top-0 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
        {carts.length}
      </div>
      {children}
    </div>
  ) : (
    <>{children}</>
  );
};

export default Account;
