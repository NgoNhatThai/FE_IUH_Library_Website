import BookGroup from '@/containers/Home/BookGroup';
import CategoryGroup from '@/containers/Home/CategoryGroup';
import GroupSlider from '@/containers/Home/GroupSlider';
import { userInfo } from '@/models/userInfo';
import { bookService } from '@/services/bookService';
import { categoryService } from '@/services/categoryService';
import { homeConfigService } from '@/services/homeConfigService';

const fetchHomeConfig = async () => {
  try {
    const homeConfigData = await homeConfigService.getConfig();
    if (!homeConfigData) return null;
    return homeConfigData;
  } catch (error) {
    console.log(error);
  }
};

const fetchCategories = async () => {
  try {
    const categoryResponse = await categoryService.getAllCategories();
    if (!categoryResponse) return null;
    return categoryResponse;
  } catch (error) {
    console.log(error);
  }
};

const fetchTopViewBook = async () => {
  try {
    const topViewBook = await bookService.getTopViewBook();
    if (!topViewBook) return null;
    return topViewBook;
  } catch (error) {
    console.log(error);
  }
};

const fetchNewUpdatedBook = async () => {
  try {
    const topViewBook = await bookService.getNewBooks();
    if (!topViewBook) return null;
    return topViewBook;
  } catch (error) {
    console.log(error);
  }
};

const fetchSuggestedBook = async () => {
  try {
    const storedUserInfo = localStorage.getItem('userInfo');
    const userInfo: userInfo = storedUserInfo
      ? JSON.parse(storedUserInfo)
      : null;
    const userId = userInfo?.userRaw?._id;
    const suggestBook = await bookService.getSuggestedBook(userId);
    if (!suggestBook) return null;
    return suggestBook;
  } catch (error) {
    console.error(error);
  }
};

const HomePage = async () => {
  const homeConfig = await fetchHomeConfig();
  const categoryResponse = await fetchCategories();
  const topViewBookResponse = await fetchTopViewBook();
  const newUpdatedBookResponse = await fetchNewUpdatedBook();
  const suggestBook = await fetchSuggestedBook();

  return (
    <div className="md:container md:mt-5">
      {homeConfig?.data?.banners && (
        <GroupSlider data={homeConfig.data.banners} />
      )}
      {categoryResponse?.data && (
        <CategoryGroup data={categoryResponse?.data} />
      )}
      {suggestBook?.data && (
        <BookGroup data={suggestBook.data} title="Gợi ý cho bạn" />
      )}
      {topViewBookResponse?.data && (
        <BookGroup
          data={topViewBookResponse.data}
          title="Sách hot trong tháng"
        />
      )}
      {newUpdatedBookResponse?.data && (
        <BookGroup
          data={newUpdatedBookResponse.data}
          title="Sách mới cập nhật"
        />
      )}
    </div>
  );
};

export default HomePage;
