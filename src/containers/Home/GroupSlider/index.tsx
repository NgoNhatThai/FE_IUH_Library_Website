'use client';
import CustomImage from '@/components/Image';
import SliderWrapper from '@/components/SliderWrapper';
import React from 'react';
const GroupSlider = ({ data }: { data: string[] }) => {
  return (
    <div className="flex">
      <SliderWrapper
        settings={{
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
        }}
      >
        {data.map((item: string) => (
          <CustomImage
            ratio="13/8"
            className="cursor-pointer md:flex"
            avatarMetadata={item}
          />
        ))}
      </SliderWrapper>
    </div>
  );
};

export default GroupSlider;
