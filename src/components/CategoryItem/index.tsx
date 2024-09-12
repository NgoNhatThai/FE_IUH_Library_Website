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
      className={`rounded-md bg-white p-2 ${isClicked ? 'opacity-50' : ''}`}
      onClick={handleClick}
    >
      <CustomImage
        avatarMetadata={category.image}
        alt="icon"
        className="round-md !z-0 m-2 border-2 border-white shadow-md"
        priority
      />
      <p className="md:text-md text-center text-[10px] font-bold text-[--text-light-color]">
        {category?.name}
      </p>
    </div>
  );
};

export default CategoryItem;
