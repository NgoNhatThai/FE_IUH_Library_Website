import { CHAPTER } from '@/constants';
import { ChapterModel } from '@/models/chapterModel';
import { useRouter } from 'next/navigation';
interface PrevNextChapterButtonProps {
  chapter: ChapterModel;
  currentIndex: number;
}
const PrevNextChapterButton = ({
  chapter,
  currentIndex,
}: PrevNextChapterButtonProps) => {
  const router = useRouter();
  return (
    <div className="mb-4 flex items-center justify-center">
      <button
        className={`rounded px-4 py-2 text-white shadow-lg ${
          chapter.allChapters && currentIndex === 0
            ? 'cursor-not-allowed bg-gray-500'
            : 'bg-blue-500'
        }`}
        onClick={() => {
          if (chapter.allChapters && chapter.allChapters.length > 0) {
            if (currentIndex && currentIndex > 0) {
              router.push(
                `${CHAPTER}/${chapter.allChapters[currentIndex - 1]._id}`,
              );
            }
          }
        }}
      >
        <p className="text-sm">Chương trước</p>
      </button>
      <select
        className="ml-2 mr-2 rounded bg-gray-200 px-4 py-2 shadow-lg md:ml-4 md:mr-4"
        value={chapter._id}
        onChange={(e) => {
          router.push(`${CHAPTER}/${e.target.value}`);
        }}
      >
        {chapter.allChapters &&
          chapter.allChapters.map((chap, index) => (
            <option key={index} value={chap._id}>
              {chap.title}
            </option>
          ))}
      </select>

      <button
        className={`rounded px-4 py-2 text-white shadow-lg ${
          chapter.allChapters && currentIndex === chapter.allChapters.length - 1
            ? 'cursor-not-allowed bg-gray-500'
            : 'bg-blue-500'
        }`}
        onClick={() => {
          if (
            chapter.allChapters &&
            currentIndex != undefined &&
            currentIndex < chapter.allChapters.length - 1
          ) {
            router.push(
              `${CHAPTER}/${chapter.allChapters[currentIndex + 1]._id}`,
            );
          }
        }}
      >
        <p className="text-sm">Chương sau</p>
      </button>
    </div>
  );
};
export default PrevNextChapterButton;
