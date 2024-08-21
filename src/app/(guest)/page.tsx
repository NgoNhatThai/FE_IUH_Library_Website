import BookGroup from '@/containers/Home/BookGroup';
import CategoryGroup from '@/containers/Home/CategoryGroup';
// import GroupProduct from '@/containers/Home/GroupProduct';
import GroupSlider from '@/containers/Home/GroupSlider';
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

// const renderHomeConfig = (homeConfigItemModel: HomeConfigTypeModel) => {
//   switch (homeConfigItemModel.cmsCategory?.renderType) {
//     case CmsCategoryRenderType.PRODUCT_GROUP: {
//       return <GroupProduct data={homeConfigItemModel} />;
//     }
//     case CmsCategoryRenderType.SLIDER: {
//       return (
//         homeConfigItemModel?.banners && (
//           <GroupSlider data={homeConfigItemModel?.banners} />
//         )
//       );
//     }
//     case CmsCategoryRenderType.CATEGORY: {
//       return <CategoryGroup data={homeConfigItemModel} />;
//     }
//     default:
//       return null;
//   }
// };
const HomePage = async () => {
  const homeConfig = await fetchHomeConfig();
  const categoryResponse = await fetchCategories();
  const topViewBookResponse = await fetchTopViewBook();
  return (
    <div className="md:container md:mt-10">
      {homeConfig?.data?.banners && (
        <GroupSlider data={homeConfig.data.banners} />
      )}
      {categoryResponse?.data && (
        <CategoryGroup data={categoryResponse?.data} />
      )}
      {topViewBookResponse?.data && (
        <BookGroup data={topViewBookResponse.data} />
      )}
    </div>
  );
};

export default HomePage;
