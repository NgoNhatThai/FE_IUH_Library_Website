import ShareSvg from '@/assets/svg/mdi_share.svg';
import { ProductModel } from '@/models';
import { formatCurrencyVND } from '@/ultils/number';
import { convertNumberToNumberText } from '@/ultils/text';
import { Star, StarHalf } from 'lucide-react';
import img from '@/assets/images/no-image.png';
import CustomImage from '@/components/Image';
import Image from 'next/image';

const DetailProductInfo = ({ product }: { product: ProductModel }) => {
  const rating = 5;
  return (
    <div className="md:mt-2 p-2">
      <div className="flex flex-col md:flex-row gap-4">
        <CustomImage
          avatarMetadata={product?.avatarMetadata}
          alt="dịch vụ chăm sóc thú cưng"
          className="h-full w-full md:h-1/3 md:w-1/3 object-contain rounded-md"
          errorSrc={img.src}
        />
        <div className="h-full w-full mt-2">
          <div className="flex items-center justify-between md:py-5">
            <p className="text-sm font-bold md:text-xl">{product?.name}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-grey-900 text-2xl font-semibold">
              {formatCurrencyVND(Number(product?.price))}
            </span>
          </div>

          <div className="flex w-full items-center gap-2 mt-2">
            <div className="flex flex-grow items-center gap-1">
              <span className="mr-1 rounded-sm bg-orange-400 px-1">
                {rating}
              </span>
              {Array.from({ length: rating }, (_, index) => {
                let num = index + 0.5;
                return (
                  <span key={index}>
                    {rating >= index + 1 ? (
                      <Star strokeWidth={3} size={18} color="#FF8922" />
                    ) : rating >= num ? (
                      <StarHalf strokeWidth={3} size={18} color="#FF8922" />
                    ) : (
                      ''
                    )}
                  </span>
                );
              })}
            </div>
            {product.totalSales ?
              <span className="font-semibold text-pink-800">
                Đã bán{' '}
                {convertNumberToNumberText(
                  product?.totalSales === undefined ? 0 : product.totalSales,
                )}
              </span>
              :
              <span className="font-semibold text-pink-800">
                Đã bán{' '}0
              </span>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailProductInfo;
