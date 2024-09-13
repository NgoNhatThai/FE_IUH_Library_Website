'use client';
import { CategoryModel } from '@/models';
import React, { useState } from 'react';
import CustomImage from '@/components/Image';
import { useRouter } from 'next/navigation';

const CategoryItem = ({ category }: { category: CategoryModel }) => {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    router.push(`/search?categoryId=${category._id}`);
  };

  return (
    <div
      className={`flex flex-col items-center rounded-md bg-white p-2 ${isClicked ? 'opacity-50' : ''}`}
      onClick={handleClick}
      title={category?.name}
    >
      <CustomImage
        avatarMetadata={category.image}
        alt="icon"
        className="!z-0 rounded-md border-2 border-white shadow-md"
        priority
      />
      <p className="w-full truncate text-center text-xs font-bold text-gray-600 md:text-sm">
        {category?.name}
      </p>
    </div>
  );
};

export default CategoryItem;
