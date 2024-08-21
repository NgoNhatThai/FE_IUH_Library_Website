'use client';
import { CategoryModel } from '@/models';
import React, { useEffect, useState } from 'react';
import CategoryItem from '@/components/CategoryItem';
import { useRouter } from 'next/navigation';
import SliderWrapper from '@/components/SliderWrapper';

const CategoryGroup = ({ data }: { data: CategoryModel[] }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, []);

  const router = useRouter();
  // const handleOnClick = (link: CmsLinkModel) => {
  //   router.push(
  //     `${CATEGORIES}?categoryId=${(link.targetObject as CategoryModel).id}`,
  //   );
  // };
  return (
    <div className="bg-[var(--background-light-color)] p-2">
      <div className="flex items-center gap-3">
        <p className="text-md font-bold text-[text-light-color]">
          Danh mục sách
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
          {data.map((item: CategoryModel) => {
            return (
              <div key={item._id} onClick={() => {}}>
                <CategoryItem key={item._id} category={item} />
              </div>
            );
          })}
        </SliderWrapper>
      </div>
    </div>
  );
};

export default CategoryGroup;
