'use client';
import React from 'react';
import Slider from 'react-slick';
import { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/slider.scss';
import arrowIcon from '@/assets/svg/arrow-left.svg';
import { CmsCategoryModel } from '@/models';
import Image from 'next/image';
import CustomImage from '@/components/Image';

const arrowStyles: any = {
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  width: '30px',
  height: '30px',
  boxShadow: 'none',
  fontSize: '20px',
  border: '1px solid #ccc',
  padding: '5px',
  zIndex: 1,
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'white',
  borderRadius: '8px',
};

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className={
        'arrow-slick hidden cursor-pointer items-center justify-center rounded-lg p-2 shadow-lg hover:bg-gray-200 md:flex'
      }
      style={{
        ...arrowStyles,
        right: '15px',
        transform: 'translateY(-50%) rotate(180deg)',
      }}
      onClick={onClick}
    >
      <Image src={arrowIcon} alt="arrow-right" />
    </div>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className={
        'arrow-slick hidden cursor-pointer items-center justify-center rounded-lg p-2 shadow-lg hover:bg-gray-200 md:flex'
      }
      style={{
        ...arrowStyles,
        left: '15px',
      }}
      onClick={onClick}
    >
      <Image src={arrowIcon} alt="arrow-right" />
    </div>
  );
}

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const dots = 2;

const ProductSlider = ({ data: banners }: { data: CmsCategoryModel[] }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const handleBeforeOnChange = (oldIndex: number, newIndex: number) => {
    setCurrentSlide(newIndex % dots);
  };

  return (
    <div className="relative h-full w-full">
      <Slider {...settings} beforeChange={handleBeforeOnChange}>
        {banners?.map((item) => {
          return (
            <div key={item.id}>
              <CustomImage
                size="large"
                alt={item?.name}
                className="!h-full object-cover"
                ratio="video"
                avatarMetadata={item?.avatarMetadata}
              />
            </div>
          );
        })}
      </Slider>
      <style jsx global>{`
        @media screen and (max-width: 560px) {
          .slick-dots li:nth-child(${currentSlide + 1}) {
            button {
              opacity: 1;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default ProductSlider;
