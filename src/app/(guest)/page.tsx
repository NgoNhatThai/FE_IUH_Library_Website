'use client';
import { useEffect, useMemo, useState } from 'react';
import BookGroup from '@/containers/Home/BookGroup';
import CategoryGroup from '@/containers/Home/CategoryGroup';
import GroupSlider from '@/containers/Home/GroupSlider';
import { bookService } from '@/services/bookService';
import { categoryService } from '@/services/categoryService';
import { homeConfigService } from '@/services/homeConfigService';
import { userInfo } from '@/models/userInfo';

interface HomeConfig {
  data?: {
    banners?: string[];
  };
}

interface CategoryResponse {
  data?: Array<any>;
}

interface BookResponse {
  data?: Array<any>;
}

declare global {
  interface Window {
    CozeWebSDK: any;
  }
}

// Hàm để load script và chờ script tải xong
const loadCozeChat = () => {
  const script = document.createElement('script');
  script.src =
    'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.0.0-beta.4/libs/oversea/index.js';
  script.onload = () => {
    if (window.CozeWebSDK) {
      new window.CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7419067016906801168',
        },
        componentProps: {
          title: 'IUH Library',
        },
      });
    }
  };
  document.body.appendChild(script);
};

const HomePage: React.FC = () => {
  const [homeConfig, setHomeConfig] = useState<HomeConfig | null>(null);
  const [categoryResponse, setCategoryResponse] =
    useState<CategoryResponse | null>(null);
  const [recommendBooks, setRecommendBooks] = useState<BookResponse | null>(
    null,
  );
  const [topViewBookResponse, setTopViewBookResponse] =
    useState<BookResponse | null>(null);
  const [newUpdatedBookResponse, setNewUpdatedBookResponse] =
    useState<BookResponse | null>(null);
  const [majorBooks, setMajorBooks] = useState<BookResponse | null>(null);

  const storedUserInfo =
    typeof window !== 'undefined' ? localStorage.getItem('userInfo') : '';
  const user: userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  const userId = useMemo(() => {
    return user?.userRaw?._id;
  }, [user]);

  const majorId = useMemo(() => {
    return user?.userRaw?.majorId?._id;
  }, [user]);

  useEffect(() => {
    loadCozeChat();

    const fetchHomeData = async () => {
      try {
        const homeConfigData: HomeConfig = await homeConfigService.getConfig();
        setHomeConfig(homeConfigData);

        const categoryData: CategoryResponse =
          await categoryService.getAllCategories();
        setCategoryResponse(categoryData);

        const topViewBook: BookResponse = await bookService.getTopViewBook();
        setTopViewBookResponse(topViewBook);

        const newUpdatedBook: BookResponse = await bookService.getNewBooks();
        setNewUpdatedBookResponse(newUpdatedBook);

        const majorBooks: BookResponse =
          await bookService.getBookByMajor(majorId);
        setMajorBooks(majorBooks);

        const recommendBooks: BookResponse =
          await bookService.getSuggestedBook(userId);
        setRecommendBooks(recommendBooks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="md:container md:mt-5">
      {homeConfig?.data?.banners && (
        <GroupSlider data={homeConfig.data.banners} />
      )}
      {categoryResponse?.data && (
        <CategoryGroup data={categoryResponse?.data} />
      )}
      {recommendBooks?.data?.length && (
        <BookGroup data={recommendBooks.data} title="Gợi ý cho bạn" />
      )}
      {topViewBookResponse?.data && (
        <BookGroup
          data={topViewBookResponse.data}
          title="Sách hot trong tháng"
        />
      )}
      {majorBooks?.data && (
        <BookGroup data={majorBooks.data} title="Sách theo chuyên ngành" />
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
