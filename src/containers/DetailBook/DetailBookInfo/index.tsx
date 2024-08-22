import { formatCurrencyVND } from '@/ultils/number';
import { Star, StarHalf } from 'lucide-react';
import img from '@/assets/images/no-image.png';
import CustomImage from '@/components/Image';
import { BookModel } from '@/models/bookModel';
import { ChapterModel } from '@/models/chapterModel';
import { useRouter } from 'next/navigation';
import { CHAPTER } from '@/constants';

const DetailBookInfo = ({ data }: { data: BookModel }) => {
  const rating = 5;
  const router = useRouter();

  const handleOnClick = (item: ChapterModel) => {
    router.push(`${CHAPTER}/${item._id}`);
  };

  return (
    <div className="container p-2">
      <div className="flex flex-col gap-4 md:flex-row">
        <CustomImage
          avatarMetadata={data.image}
          alt="dịch vụ chăm sóc thú cưng"
          className="h-full w-full rounded-md object-contain md:h-1/3 md:w-1/3"
          errorSrc={img.src}
        />
        <div className="mt-2 h-full w-full">
          <div className="flex items-center justify-between">
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
          </div>

          <div className="mt-4">
            <p className="md:text-md text-sm text-gray-600">
              Danh mục:
              <span className="ml-2 text-gray-700">
                {typeof data?.categoryId === 'object' &&
                data?.categoryId !== null
                  ? data.categoryId.name
                  : 'Đang cập nhật'}
              </span>
            </p>

            <p className="md:text-md text-sm text-gray-600">
              Tác giả:{' '}
              <span className="text-gray-700">
                {typeof data?.authorId === 'object' && data?.authorId !== null
                  ? data.authorId.name
                  : 'Đang cập nhật'}
              </span>
            </p>
            <p className="md:text-md text-sm text-gray-600">
              Lượt xem: <span className="text-gray-700">{/* Lượt xem */}</span>
            </p>
            <p className="md:text-md text-sm text-gray-600">
              Tình trạng:{' '}
              <span className="text-gray-700">
                {data.status === 'PUBLISH' ? 'Đang phát hành' : 'Tạm ngưng'}
              </span>
            </p>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={() => {
                const chapter =
                  typeof data?.content === 'object' &&
                  data.content &&
                  data.content.chapters
                    ? data.content.chapters[0]
                    : {};
                handleOnClick(chapter);
              }}
            >
              Đọc từ đầu
            </button>
            <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
              Đọc tiếp
            </button>
            <button className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
              Theo dõi
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 w-full p-4 text-sm shadow-md md:mt-4">
        <h3 className="text-lg font-semibold">Nội dung sách</h3>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default DetailBookInfo;
