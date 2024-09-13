'use client';
import BookItem from '@/components/BookItem';
import SliderWrapper from '@/components/SliderWrapper';
import { BOOK } from '@/constants';
import { BookModel } from '@/models/bookModel';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
interface BookGroupProps {
  title?: string;
  data: BookModel[];
}
const BookGroup = ({ title, data }: BookGroupProps) => {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = React.useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleOnClick = (item: BookModel) => {
    router.push(`${BOOK}/${item._id}`);
  };
  return (
    <div className="bg-[var(--background-light-color)] p-2">
      <div className="flex items-center gap-3">
        <p className="text-md font-bold text-gray-800">
          {title ?? 'Sách nên đọc'}
        </p>
      </div>
      <div className="mt-2">
        <SliderWrapper
          settings={{
            slidesToShow: windowWidth > 768 ? 4 : 2,
            slidesToScroll: 1,
            dots: false,
            centerMode: windowWidth > 768 ? false : true,
            centerPadding: windowWidth > 768 ? '0px' : '10%',
            swipeToSlide: true,
          }}
        >
          {data
            ?.map((item) => item)
            .map((item, index) => (
              <div
                key={index}
                onClick={() => handleOnClick(item)}
                className="p-2 transition-transform duration-300 hover:scale-105"
              >
                <BookItem data={item} />
              </div>
            ))}
        </SliderWrapper>
      </div>
    </div>
  );
};

export default BookGroup;
