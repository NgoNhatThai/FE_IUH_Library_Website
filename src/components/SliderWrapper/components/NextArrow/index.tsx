import arrowIcon from '@/assets/svg/arrow-left.svg';
import Image from 'next/image';
import { CSSProperties } from 'react';

interface NextArrowProps {
  onClick?: () => void;
  styles?: CSSProperties;
}

const NextArrow = (props: NextArrowProps) => {
  const { onClick, styles } = props;
  return (
    <div
      className={
        'arrow-slick hidden cursor-pointer items-center justify-center rounded-lg p-2 shadow-lg hover:bg-gray-200 md:flex'
      }
      style={{
        ...styles,
        right: '15px',
        transform: 'translateY(-50%) rotate(180deg)',
      }}
      onClick={onClick}
    >
      <Image src={arrowIcon} alt="arrow-right" />
    </div>
  );
};

export default NextArrow;
