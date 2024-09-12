import ConfirmDeleteModal from '@/components/DeleteModal';
import { ItemCartModel } from '@/models/itemCartModel';
import { modifyQuantity, removeCheckListItem } from '@/redux/slices/cart-slice';
import { formatCurrencyVND } from '@/ultils/number';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const QuantityProductManagement = ({ item }: { item: ItemCartModel }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDecreaseQuantity = (item: ItemCartModel) => {
    const cartsLocalStorage = localStorage.getItem('@cart');
    if (cartsLocalStorage) {
      const cartItems = JSON.parse(cartsLocalStorage) as ItemCartModel[];
      if (item?.quantity && item?.quantity === 1) {
        setIsModalOpen(true);
        return;
      }
      const newCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id && item?.quantity && item?.quantity > 1) {
          cartItem.quantity = (item.quantity || 1) - 1;
        } 
        return cartItem;
      });
      localStorage.setItem('@cart', JSON.stringify(newCartItems));
      dispatch(
        modifyQuantity({ id: item.id, quantity: item.quantity || 1 - 1 }),
      );
    }
  };

  const handleIncreaseQuantity = (item: ItemCartModel) => {
    const cartsLocalStorage = localStorage.getItem('@cart');
    if (cartsLocalStorage) {
      const cartItems = JSON.parse(cartsLocalStorage) as ItemCartModel[];
      const newCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          cartItem.quantity = (cartItem.quantity || 0) + 1;
        }
        return cartItem;
      });
      localStorage.setItem('@cart', JSON.stringify(newCartItems));
      dispatch(
        modifyQuantity({ id: item.id, quantity: item.quantity || 0 + 1 }),
      );
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
    <div className="relative flex flex-col items-start">
      {
        (item.quantity) && (
          <span className="text-sm font-medium text-red-700 mb-2">
            {(item.price !== 0) ? formatCurrencyVND(item.price! * item.quantity) : formatCurrencyVND(0)}
          </span>
        )
      }
      <div className="flex items-center space-x-3">
        <button
          className="flex h-6 w-6 items-center justify-center text-center rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          onClick={() => handleDecreaseQuantity(item)}
        >
          <p className="text-center font-bold mb-1">-</p>
        </button>
        <span className="text-sm font-semibold">{item.quantity}</span>
        <button
          className="flex h-6 w-6 items-center justify-center text-center rounded-md bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          onClick={() => handleIncreaseQuantity(item)}
        >
          <p className="text-center font-bold mb-1">+</p>
        </button>
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

export default QuantityProductManagement;
