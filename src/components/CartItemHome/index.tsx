'use client';
import { ProductModel, ProductType } from '@/models';
import { formatCurrencyVND } from '@/ultils/number';
import { convertNumberToNumberText } from '@/ultils/text';
import { Star, StarHalf } from 'lucide-react';
import CustomImage from '../Image';
import React, { useEffect, useState } from 'react';

interface CartItemHomeProps {
  data: ProductModel;
}

const CartItemHome = ({ data }: CartItemHomeProps) => {
  const [rating, setRating] = useState<number>(0);
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };
  useEffect(() => {
    setRating(Math.ceil(Math.random() * 10) % 2 === 0 ? 5 : 4)
  }, [])
  return (
    <div
      className={`card flex cursor-pointer flex-col items-center rounded-md bg-white p-1 ${selected ? 'opacity-50' : ''}`}
      onClick={handleClick}
    >
      <CustomImage
        avatarMetadata={data.avatarMetadata}
        alt="product img"
        className={`rounded-md`}
        priority
      />
      <p className="mt-1 line-clamp-2 min-h-10 w-full text-xs font-medium text-[--text-light-color]">
        {data.name}
      </p>
      <div className="flex flex-col w-full items-center justify-start flex-wrap">
        <p className="w-full self-start text-[13px] font-semibold text-red-500">
          {formatCurrencyVND(data?.price || 0)}
        </p>
        <p className="w-full text-[--default-light-color] text-[11px] font-light line-through h-5">
          {formatCurrencyVND(data?.oldPrice || 0)}
        </p>
      </div>
      <div className="flex w-full items-center gap-2">
        <div className="flex items-center justify-center">
          {Array.from({ length: rating }, (_, index) => {
            let num = index + 0.5;
            return (
              <span key={index}>
                {rating >= index + 1 ? (
                  <Star strokeWidth={2} size={10} color="#FF8922" />
                ) : rating >= num ? (
                  <StarHalf strokeWidth={2} size={10} color="#FF8922" />
                ) : (
                  ''
                )}
              </span>
            );
          })}
        </div>
        {data?.totalSales ? (
          <p className="line-clamp-1 text-xs font-medium leading-none ml-2 text-[--text-light-color]">
            Đã {data?.type === ProductType.SERVICE ? 'đặt' : 'bán'}{' '}
            {convertNumberToNumberText(data.totalSales)}
          </p>
        ) : (
          <p className="line-clamp-1 text-xs font-medium leading-none ml-2 text-[--text-light-color]">
            Đã {data?.type === ProductType.SERVICE ? 'đặt' : 'bán'}{' '} 0
          </p>
        )}
      </div>
    </div>
  );
};

export default CartItemHome;
