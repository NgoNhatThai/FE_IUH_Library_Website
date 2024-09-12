import React from 'react';
import CartSvg from '@/assets/svg/cart.svg';
import Image from 'next/image';

const CardEmpty = () => {
  return (
    <div className="flex justify-center items-center p-5">
      <div className='flex flex-col items-center justify-center'>
        <p className="mb-5 text-base text-center">
          Bạn chưa có sản phẩm nào trong giỏ hàng
        </p>
        <div
          onClick={() => {
            window.location.href = '/';
          }}
          className="focus:shadow-outline min-h-20 w-4/5 rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none flex flex-col items-center"
        >
          <Image
            src={CartSvg}
            className="h-40 w-40"
            alt="Giỏ hàng rỗng"
            height={1000}
            width={1000}
          />
          <p>Về trang chủ mua sắm nào</p>
        </div>
      </div>
    </div>
  );
};

export default CardEmpty;
