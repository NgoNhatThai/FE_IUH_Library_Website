'use client';
import { CategoryModel } from '@/models';
import React, { useState } from 'react';
import CustomImage from '@/components/Image';

const CategoryItem = ({ category }: { category: CategoryModel }) => {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    setSelected(!selected);
  };
  return (
    <div
      className={`h-28 w-[70px] rounded-md bg-white p-1 md:h-48 md:w-36 ${selected ? 'opacity-50' : ''}`}
      onClick={handleClick}
    >
      <CustomImage
        avatarMetadata={category.image}
        alt="icon"
        className="round-md !z-0 border-2 border-white"
        priority
      />
      <p className="md:text-md text-center text-[10px] font-bold text-[--text-light-color]">
        {category?.name}
      </p>
    </div>
  );
};

export default CategoryItem;
