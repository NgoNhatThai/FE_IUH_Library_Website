import cartIcon from '@/assets/svg/cart-shopping-svgrepo-com.svg';
import NotifyModal from '@/components/NotifyModal';
import { ProductModel } from '@/models';
import { ItemCartModel } from '@/models/itemCartModel';
import { removeFullItems, setFullListItems } from '@/redux/slices/cart-slice';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const ButtonFooter = ({ product }: { product: ProductModel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const cartStore = useSelector((state: any) => state.cartStore);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cart = localStorage.getItem('@cart');
    let productInCart = false;

    if (cart) {
      const cartArray = JSON.parse(cart);
      cartArray.forEach((item: ItemCartModel) => {
        if (item.productID === product.id) {
          item.quantity! += 1;
          productInCart = true;
        }
      });

      if (!productInCart) {
        const newCartItem: ItemCartModel = {
          id: uuidv4(),
          productID: product.id,
          name: product.name,
          linkAvatar: product.avatarMetadata?.[0]?.downloadUrl ?? '',
          quantity: 1,
          price: product.price,
        };
        cartArray.push(newCartItem);
      }
      dispatch(removeFullItems());
      dispatch(setFullListItems(cartStore.checkList));
      localStorage.setItem('@cart', JSON.stringify(cartArray));
    } else {
      const newCartItem: ItemCartModel = {
        id: uuidv4(),
        productID: product.id,
        name: product.name,
        linkAvatar: product.avatarMetadata?.[0]?.downloadUrl ?? '',
        quantity: 1,
        price: product.price,
      };
      localStorage.setItem('@cart', JSON.stringify([newCartItem]));
      dispatch(setFullListItems([]));
    }
    setModalTitle('Đã thêm vào giỏ hàng');
    setIsModalOpen(true);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 flex h-16 items-center justify-between gap-4 border-t-2 border-gray-200 bg-white px-4 shadow-md md:justify-end md:px-8">
      <button
        className="flex h-10 w-48 items-center justify-center gap-2 border-r-2 border-gray-200 p-2 text-gray-700 transition-colors duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 max-sm:flex-1"
        aria-label="Consultation"
      >
        <Image src="/headphone.svg" alt="Phone icon" width={24} height={24} />
        <span className="text-sm font-bold">Tư vấn</span>
      </button>

      <button
        className="flex h-10 w-48 items-center justify-center gap-2 border-r-2 border-gray-200 p-2 text-gray-700 transition-colors duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 max-sm:flex-1"
        onClick={handleAddToCart}
        aria-label="Add to cart"
      >
        <Image src={cartIcon} alt="Cart icon" width={24} height={24} />
        <span className="text-sm font-bold">Thêm</span>
      </button>

      <button
        className="flex h-10 w-1/6 items-center justify-center rounded-md bg-pink-700 p-2 text-white transition-colors duration-300 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 max-sm:flex-1"
        aria-label="Buy now"
      >
        <span className="text-sm font-semibold">Mua ngay</span>
      </button>

      <NotifyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      />
    </div>
  );
};

export default ButtonFooter;
