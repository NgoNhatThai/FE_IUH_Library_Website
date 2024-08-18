import React, { memo, useMemo } from 'react';
import Image from 'next/image';
import NotFoundImage from '@/assets/images/no-image.png';
import { ImageModel } from '@/models';
import bannerSrc from '@/assets/images/banner.png';

interface Ratio {
  square?: string;
  video?: string;
  '3/2'?: string;
  '4/3'?: string;
  '21/9'?: string;
  '9/16'?: string;
  '13/8'?: string;
}

interface ImageProps {
  src?: string;
  alt?: string;
  errorSrc?: string;
  ratio?: keyof Ratio;
  className?: string;
  onClick?: () => void;
  avatarMetadata?: ImageModel[] | ImageModel;
  size?: 'small' | 'medium' | 'large';
  customRatio?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

const ratioClass: Ratio = {
  square: 'aspect-square',
  video: 'aspect-video',
  '3/2': 'aspect-[3/2]',
  '4/3': 'aspect-[4/3]',
  '21/9': 'aspect-[21/9]',
  '9/16': 'aspect-[9/16]',
};

const LazyImage = ({
  src,
  errorSrc,
  alt,
  className,
  ratio = 'square',
  onClick,
  avatarMetadata,
  customRatio,
  size = 'large',
  style,
  priority,
}: ImageProps) => {
  const imagesSrc = useMemo(() => {
    if (avatarMetadata) {
      const targetArray = Array.isArray(avatarMetadata)
        ? avatarMetadata
        : [avatarMetadata];

      const avatar = targetArray
        ?.map((avatar) => avatar?.[size]?.url)
        ?.filter(Boolean)?.[0];

      return (
        avatar || targetArray?.[0]?.downloadUrl || errorSrc || NotFoundImage
      );
    }

    return src || errorSrc || NotFoundImage;
  }, [JSON.stringify(avatarMetadata), src, errorSrc]);
  return (
    <Image
      src={bannerSrc}
      alt={alt ?? 'image'}
      width={1000}
      height={1000}
      priority={priority}
      onError={(e: any) => {
        e.target.srcset = errorSrc || NotFoundImage.src;
        e.target.onerror = null;
      }}
      className={`w-full object-cover transition-all ${ratioClass[ratio]} ${customRatio} ${className}`}
      onClick={onClick}
    />
  );
};

export default memo(LazyImage);
