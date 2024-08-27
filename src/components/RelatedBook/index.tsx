'use client';
import SliderWrapper from '@/components/SliderWrapper';
import Link from 'next/link';
import { BOOK } from '@/constants';
import { useEffect, useState } from 'react';
import { BookModel, BookResponse } from '@/models/bookModel';
import BookItem from '../BookItem';

const RelatedBook = ({ data }: { data: BookResponse }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <div className="rounded-md bg-[var(--background-light-color)] p-2">
      <SliderWrapper
        settings={{
          slidesToShow: windowWidth > 768 ? 4 : 2,
          slidesToScroll: 1,
          dots: false,
          autoplay: false,
          centerMode: windowWidth > 768 ? false : true,
          centerPadding: windowWidth > 768 ? '0px' : '5%',
          swipeToSlide: true,
        }}
      >
        {data?.data
          ?.map((item) => item as BookModel)
          .map((item) => (
            <div key={item._id} className="flex w-[152px] px-1">
              <Link href={`${BOOK}/${item._id}`}>
                <BookItem data={item} />
              </Link>
            </div>
          ))}
      </SliderWrapper>
    </div>
  );
};

export default RelatedBook;
