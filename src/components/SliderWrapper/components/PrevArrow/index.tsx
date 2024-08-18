import arrowIcon from '@/assets/svg/arrow-left.svg';
import Image from 'next/image';
import { CSSProperties } from 'react';

interface PrevArrowProps {
  onClick?: () => void;
  styles?: CSSProperties;
}

const PrevArrow = (props: PrevArrowProps) => {
  const { onClick, styles } = props;
  return (
    <div
      className={
        'arrow-slick hidden cursor-pointer items-center justify-center rounded-lg p-2 shadow-lg hover:bg-gray-200 md:flex'
      }
      style={{
        ...styles,
        left: '15px',
      }}
      onClick={onClick}
    >
      <Image src={arrowIcon} alt="arrow-right" />
    </div>
  );
};

export default PrevArrow;
