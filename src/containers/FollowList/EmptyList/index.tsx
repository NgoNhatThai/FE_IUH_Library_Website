import React from 'react';
import EmptyBookIcon from '@/assets/svg/book-empty.svg';
import Image from 'next/image';

const EmptyList = () => {
  return (
    <div className="flex items-center justify-center p-5">
      <div className="flex flex-col items-center justify-center">
        <p className="mb-5 text-center text-base">Danh sách theo dõi trống</p>
        <div
          onClick={() => {
            window.location.href = '/';
          }}
          className="focus:shadow-outline flex min-h-20 w-4/5 flex-col items-center rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          <Image
            src={EmptyBookIcon}
            className="h-40 w-40"
            alt="Empty Book Icon"
            height={1000}
            width={1000}
          />
          <p>Khám phá thế giới sách của riêng bạn</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyList;
