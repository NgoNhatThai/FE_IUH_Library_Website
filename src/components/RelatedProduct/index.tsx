'use client';
import SliderWrapper from '@/components/SliderWrapper';
import { ProductModel } from '@/models';
import { ListResponse } from '@/types/api';
import CartItemHome from '../BookItem';
import Link from 'next/link';
import { PRODUCT } from '@/constants';
import { useEffect, useState } from 'react';

const RelatedProduct = ({ data }: { data: ListResponse<ProductModel> }) => {
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
        {data?.content
          ?.map((item) => item as ProductModel)
          .map((product) => (
            <div key={product.id} className="flex w-[152px] px-1">
              <Link href={`${PRODUCT}/${product.id}`}>
                <CartItemHome data={product} />
              </Link>
            </div>
          ))}
        {/* <p>1</p>
        <p>2</p>
        <p>3</p> */}
      </SliderWrapper>
    </div>
  );
};

export default RelatedProduct;
