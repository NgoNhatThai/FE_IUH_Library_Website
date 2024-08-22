import { CHAPTER } from '@/constants';
import { BookModel } from '@/models/bookModel';
import { ChapterModel } from '@/models/chapterModel';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

const ChapterContainer = ({ data }: { data: BookModel }) => {
  const router = useRouter();
  const chapters =
    typeof data.content === 'object' ? data.content.chapters : [];

  const handleOnClick = (item: ChapterModel) => {
    router.push(`${CHAPTER}/${item._id}`);
  };
  return (
    <>
      <p className="text-lg font-bold">Danh sách chương</p>
      <div className="grid grid-cols-1 gap-2">
        {chapters &&
          chapters.map((chapter, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center justify-between border-b border-gray-300 py-2 hover:text-blue-700"
              onClick={() => handleOnClick(chapter)}
            >
              <p className="text-sm">{chapter.title}</p>
              <p className="text-sm">
                {dayjs(chapter.updatedAt).format('DD/MM/YYYYY HH:mm')}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};
export default ChapterContainer;
