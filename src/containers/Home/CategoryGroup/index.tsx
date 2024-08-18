'use client';
import { CategoryModel, CmsLinkModel, HomeConfigItemModel } from '@/models';
import React, { useEffect, useState } from 'react';
import CustomImage from '@/components/Image';
import CategoryItem from '@/components/CategoryItem';
import { useRouter } from 'next/navigation';
import { CATEGORIES } from '@/constants';
import SliderWrapper from '@/components/SliderWrapper';

const CategoryGroup = ({ data }: { data: HomeConfigItemModel }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, [])

  const router = useRouter();
  const handleOnClick = (link: CmsLinkModel) => {
    router.push(
      `${CATEGORIES}?categoryId=${(link.targetObject as CategoryModel).id}`,
    );
  };
  return (
    <div
      id={String(data.id)}
      className="bg-[var(--background-light-color)] p-2"
    >
      <div className="flex items-center gap-3">
        {Array.isArray(data.cmsCategory?.avatarMetadata) &&
          data.cmsCategory.avatarMetadata.length > 0 && (
            <div className="h-[20px] w-[20px] overflow-hidden rounded-full">
              <CustomImage
                avatarMetadata={data.cmsCategory.avatarMetadata}
                alt="icon"
                className="!z-0"
              />
            </div>
          )}
        <p className="text-md font-bold text-[text-light-color]">
          {data.cmsCategory?.name}
        </p>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <SliderWrapper
          settings={{
            slidesToShow: windowWidth > 768 ? 6 : 5,
            slidesToScroll: 1,
            dots: false,
            autoplay: true,
            centerMode: windowWidth > 768 ? true : false,
            centerPadding: windowWidth > 768 ? '100px' : '14px',
            swipeToSlide: true,
          }}
        >
          {data.cmsCategory?.linkDTOs?.map((link) => {
            return (
              <div key={link.id} onClick={() => handleOnClick(link)}>
                <CategoryItem
                  key={link.id}
                  category={link.targetObject as CategoryModel}
                />
              </div>
            );
          })}
        </SliderWrapper>
      </div>

    </div >
  );
};

export default CategoryGroup;
