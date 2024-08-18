'use client';
import ConfirmDeleteModal from '@/components/DeleteModal';
import { ItemCartModel } from '@/models/itemCartModel';
import Image from 'next/image';
import { useState } from 'react';
import QuantityProductManagement from '../QuantityProductManagement';
import { useDispatch } from 'react-redux';
import {
  addCheckListItem,
  removeCheckListItem,
} from '@/redux/slices/cart-slice';
import { useRouter } from 'next/navigation';
import { PRODUCT } from '@/constants';

const CartItem = ({
  item,
  checked,
}: {
  item: ItemCartModel;
  checked?: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleOnClick = (item: ItemCartModel) => {
    router.push(`${PRODUCT}/${item.productID}`);
  };
  const handleOnChange = (checked: boolean) => {
    if (checked) {
      dispatch(addCheckListItem(item as ItemCartModel));
    } else {
      dispatch(removeCheckListItem({ id: item.id! }));
    }
  };

  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    const cartsLocalStorage = localStorage.getItem('@cart');
    if (cartsLocalStorage) {
      const cartItems = JSON.parse(cartsLocalStorage) as ItemCartModel[];
      const newCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== item.id,
      );
      localStorage.setItem('@cart', JSON.stringify(newCartItems));
    }
    dispatch(removeCheckListItem({ id: item.id! }));
  };

  return (
    <div className="flex items-center gap-2 flex-1 md:mt-10 md:border-b-2 md:pb-5">
      <input
        type="checkbox"
        className="rounded-md border px-2 py-1 pr-5 text-xs text-black focus:border-transparent focus:outline-none sm:py-2 md:pr-8"
        checked={checked}
        onChange={(e) => handleOnChange(e.target.checked)}
      />
      <div className="flex gap-2 flex-1">
        <div
          onClick={() => handleOnClick(item)}
        >
          <Image
            src={item?.linkAvatar || '/default-avatar.png'}
            alt="item Image"
            width={1000}
            height={1000}
            className="h-24 w-24 object-cover rounded-md"
            priority
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <p className="line-clamp-2 text-sm flex-grow">
            {item?.name || 'Item name'}
          </p>
          <div className="mt-1 flex flex-1 items-center justify-between">
            <QuantityProductManagement item={item} />
            <div className="flex items-end h-full">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-sm font-bold text-red-500"
              >
                <p>Xóa</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleConfirmDelete()}
        title="Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng không?"
      />
    </div>
  );
};

export default CartItem;
