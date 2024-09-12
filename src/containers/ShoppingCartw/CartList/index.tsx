import React from 'react';
import CartItem from './CartItem';
import { ItemCartModel } from '@/models/itemCartModel';
import { ProductModel } from '@/models';
import { useSelector } from 'react-redux';

const CartList = ({ items }: { items: ItemCartModel[] }) => {
  const cartStore = useSelector((state: any) => state.cartStore);

  const checkIsChecked = (item: ItemCartModel) => {
    return cartStore.checkList.some(
      (checkItem: ProductModel) => checkItem.id === item.id,
    );
  };

  return (
    <div className="p-2 pb-16">
      {items.map((product: ItemCartModel) => (
        <div className="my-2" key={product.id}>
          <CartItem item={product} checked={checkIsChecked(product)} />
        </div>
      ))}
    </div>
  );
};
export default CartList;
