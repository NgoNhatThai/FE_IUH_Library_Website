'use client';
import { LOCAL_STORAGE } from '@/constants';
import { ItemCartModel } from '@/models/itemCartModel';
import { useEffect, useState } from 'react';
import CartList from './CartList';
import CardEmpty from './EmptyCart';
import CheckAllCart from './CheckAllCart';
import { useDispatch, useSelector } from 'react-redux';
import { removeFullItems } from '@/redux/slices/cart-slice';
import Payment from './Payment';
import SkeletonGlobal from '@/components/Skeleton';

const ShoppingCart = () => {
  const [carts, setCarts] = useState<ItemCartModel[] | null>(null);
  const cartStore = useSelector((state: any) => state.cartStore);
  const dispatch = useDispatch();

  useEffect(() => {
    const cart = localStorage.getItem(LOCAL_STORAGE.CART);
    if (cart) {
      setCarts(JSON.parse(cart));
    } else {
      setCarts([]);
    }
  }, [cartStore]);

  useEffect(() => {
    return () => {
      if (carts) {
        dispatch(removeFullItems());
      }
    };
  }, []);

  return (
    <div className="md:container h-screen">
      {carts ? (
        <>
          {
            carts.length > 0 && (
              <>
                <CheckAllCart items={carts} />
                <CartList items={carts} />
                <Payment items={carts as ItemCartModel[]} />
              </>
            )
          }
        </>
      ) : (
        <SkeletonGlobal count={25} />
      )}
      {carts && carts?.length === 0 && <CardEmpty />}
    </div>
  );
};
export default ShoppingCart;
