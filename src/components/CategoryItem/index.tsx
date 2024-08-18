'use client';
import { CategoryModel } from "@/models";
import React, { useState } from "react";
import CustomImage from "@/components/Image";

const CategoryItem = ({ category }: { category: CategoryModel }) => {
    const [selected, setSelected] = useState(false);
    const handleClick = () => {
        setSelected(!selected);
    }
    return (
        <div className={`w-[70px] h-28 md:h-48 md:w-36 p-1 bg-white rounded-md ${selected ? 'opacity-50' : ''}`} onClick={handleClick}>
            <CustomImage
                avatarMetadata={category.avatarMetadata}
                alt="icon"
                className="!z-0 border-white border-2 round-md"
                priority
            />
            <p className="text-center text-[10px] font-bold text-[--text-light-color] md:text-md">{category?.name}</p>
        </div>
    )
}

export default CategoryItem;