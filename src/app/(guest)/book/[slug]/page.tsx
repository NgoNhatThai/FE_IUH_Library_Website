import DetailBook from '@/containers/DetailBook';
import NotFoundDetail from '@/containers/DetailBook/NotFoundDetail';
import { bookService } from '@/services/bookService';

const getDetailBook = async (id: string) => {
  try {
    return await bookService.getDetailBook(id);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const DetailProductPage = async ({ params }: { params: { slug: string } }) => {
  const detail = await getDetailBook(params.slug);
  return detail ? <DetailBook detail={detail.data} /> : <NotFoundDetail />;
};
export default DetailProductPage;
