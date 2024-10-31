'use client';
import { useEffect, useState } from 'react';
import BookGroup from '@/containers/Home/BookGroup';
import CategoryGroup from '@/containers/Home/CategoryGroup';
import GroupSlider from '@/containers/Home/GroupSlider';
import { bookService } from '@/services/bookService';
import { categoryService } from '@/services/categoryService';
import { homeConfigService } from '@/services/homeConfigService';

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
    'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/0.1.0-beta.5/libs/oversea/index.js';
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
  const [topViewBookResponse, setTopViewBookResponse] =
    useState<BookResponse | null>(null);
  const [newUpdatedBookResponse, setNewUpdatedBookResponse] =
    useState<BookResponse | null>(null);

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
