import { CHAPTER } from '@/constants';
import { BookModel } from '@/models/bookModel';
import { ChapterModel } from '@/models/chapterModel';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

const ChapterContainer = ({ data }: { data: BookModel }) => {
  const router = useRouter();
  const chapters =
    typeof data.content === 'object' ? data.content.chapters : [];

  const maxVisibleChapters = 10;
  const visibleChapters = chapters && chapters.slice(0, maxVisibleChapters);

  const handleOnClick = (item: ChapterModel) => {
    router.push(`${CHAPTER}/${item._id}`);
  };

  return (
    <>
      <p className="mb-4 text-lg font-bold">Danh sách chương</p>
      <div className="overflow-y-auto md:max-h-60">
        <div className="grid grid-cols-1 gap-2">
          {visibleChapters &&
            visibleChapters.map((chapter) => (
              <div
                key={chapter._id}
                className="flex cursor-pointer items-center justify-between border-b border-gray-300 px-4 py-2 hover:text-blue-700"
                onClick={() => handleOnClick(chapter)}
              >
                <p className="text-sm">{chapter.title}</p>
                <p className="text-sm">
                  {dayjs(chapter.updatedAt).format('DD/MM/YYYY HH:mm')}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ChapterContainer;
