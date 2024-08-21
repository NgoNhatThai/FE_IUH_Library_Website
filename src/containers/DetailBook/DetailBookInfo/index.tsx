import { formatCurrencyVND } from '@/ultils/number';
import { Star, StarHalf } from 'lucide-react';
import img from '@/assets/images/no-image.png';
import CustomImage from '@/components/Image';
import { BookModel } from '@/models/bookModel';

const DetailBookInfo = ({ data }: { data: BookModel }) => {
  const rating = 5;
  return (
    <div className="p-2 md:mt-2">
      <div className="flex flex-col gap-4 md:flex-row">
        <CustomImage
          avatarMetadata={data.image}
          alt="dịch vụ chăm sóc thú cưng"
          className="h-full w-full rounded-md object-contain md:h-1/3 md:w-1/3"
          errorSrc={img.src}
        />
        <div className="mt-2 h-full w-full">
          <div className="flex items-center justify-between md:py-5">
            <p className="text-sm font-bold md:text-2xl">{data?.title}</p>
          </div>

          <div className="flex items-center gap-2">
            {data.price ? (
              <span className="text-grey-900 text-2xl font-semibold">
                {formatCurrencyVND(Number(data?.price))}
              </span>
            ) : (
              <span className="text-grey-900 text-2xl font-semibold">
                Miễn phí
              </span>
            )}
          </div>

          <div className="mt-2 flex w-full items-center gap-2">
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
            {/* {data.totalSales ?
              <span className="font-semibold text-pink-800">
                Đã bán{' '}
                {convertNumberToNumberText(
                  data?.totalSales === undefined ? 0 : data.totalSales,
                )}
              </span>
              :
              <span className="font-semibold text-pink-800">
                Đã bán{' '}0
              </span>
            } */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailBookInfo;
