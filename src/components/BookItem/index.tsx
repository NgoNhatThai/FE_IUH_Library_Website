'use client';
import { formatCurrencyVND } from '@/ultils/number';
import { Star, StarHalf } from 'lucide-react';
import CustomImage from '../Image';
import React, { useMemo, useState } from 'react';
import { BookModel } from '@/models/bookModel';
import { useRouter } from 'next/navigation';

interface BookItemProps {
  data: BookModel | any;
  type?: string;
}
const BookItem = ({ data }: BookItemProps) => {
  const router = useRouter();
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
      <div className="relative w-full">
        <div
          className="absolute right-0 top-0 rounded-md border border-gray-300 bg-white p-1"
          style={{
            backgroundColor: data?.type == 'IMAGE' ? '#FF8922' : '#2ECC71',
          }}
        >
          <p className="line-clamp-1 w-10 text-xs font-semibold text-white">
            {data?.type == 'IMAGE' ? 'PDF' : 'E-Book'}
          </p>
        </div>

        <CustomImage
          avatarMetadata={data.image}
          alt="product img"
          className={`rounded-md`}
          priority
        />
      </div>
      <p className="mt-1 line-clamp-2 min-h-10 w-full text-sm font-semibold">
        {data.title}
      </p>
      <div className="mb-1 mt-2 flex w-full items-start justify-between gap-2 overflow-hidden text-xs font-semibold text-[--text-light-color]">
        <div
          className="w-2/5 cursor-pointer rounded-md bg-blue-500 text-center text-xs font-semibold text-white"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/search?categoryId=${data?.categoryId?._id}`);
          }}
        >
          {data?.categoryId?.name}
        </div>
      </div>

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
