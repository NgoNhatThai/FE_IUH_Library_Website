import Chapter from '@/containers/Chapter';
import { bookService } from '@/services/bookService';

const getChapter = async (id: string) => {
  try {
    const response = await bookService.getDetailChapterById(id);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
const ChapterDetailPage = async ({ params }: { params: { slug: string } }) => {
  const chapter = await getChapter(params.slug);
  return <Chapter chapter={chapter || {}} />;
};
export default ChapterDetailPage;
