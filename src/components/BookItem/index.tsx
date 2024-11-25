'use client';
import { formatCurrencyVND } from '@/ultils/number';
import { Star, StarHalf } from 'lucide-react';
import CustomImage from '../Image';
import React, { useMemo, useState } from 'react';
import { BookModel } from '@/models/bookModel';

interface BookItemProps {
  data: BookModel | any;
}

const BookItem = ({ data }: BookItemProps) => {
  const rating = useMemo(() => {
    if (typeof data?.review === 'object') {
      return data?.review?.rate;
    }
    return 5;
  }, [data]);

  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <div
      className={`card flex cursor-pointer flex-col items-center rounded-md bg-white p-1 md:p-2 ${selected ? 'opacity-50' : ''}`}
      onClick={handleClick}
    >
      <CustomImage
        avatarMetadata={data.image}
        alt="product img"
        className={`rounded-md`}
        priority
      />
      <p className="mt-1 line-clamp-2 min-h-10 w-full text-sm font-semibold">
        {data.title}
      </p>
      <div className="flex w-full flex-col flex-wrap items-center justify-start">
        <p className="w-full self-start text-xs font-semibold italic text-[--text-light-color]">
          {typeof data?.authorId === 'object' && data?.authorId?.name}
        </p>
      </div>
      <div className="flex w-full flex-col flex-wrap items-center justify-start">
        <p className="w-full self-start text-xs font-semibold text-red-500">
          {formatCurrencyVND(data?.price || 0)}
        </p>
      </div>

      <div className="mt-2 flex w-full items-center justify-between gap-2">
        <div className="flex items-center justify-center">
          {Array.from({ length: rating ?? 5 }, (_, index) => {
            let num = index + 0.5;
            return (
              <span key={index}>
                {rating ?? 5 >= index + 1 ? (
                  <Star strokeWidth={2} size={10} color="#FF8922" />
                ) : rating ?? 5 >= num ? (
                  <StarHalf strokeWidth={2} size={10} color="#FF8922" />
                ) : (
                  ''
                )}
              </span>
            );
          })}
        </div>
        <p className="ml-2 line-clamp-1 text-xs font-medium leading-none text-[--text-light-color]">
          {`Lượt xem: ${typeof data?.review === 'object' && data?.review?.totalView}`}
        </p>
      </div>
    </div>
  );
};

export default BookItem;
