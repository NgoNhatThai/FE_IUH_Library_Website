import CategoryGroup from '@/containers/Home/CategoryGroup';
import GroupProduct from '@/containers/Home/GroupProduct';
import GroupSlider from '@/containers/Home/GroupSlider';
import {
  CmsCategoryRenderType,
  HomeConfigItemModel,
  HomeConfigModel,
} from '@/models';
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

const sortHomeConfig = (homeConfig: HomeConfigModel) => {
  if (!homeConfig?.configDTOs) return null;
  
  return homeConfig.configDTOs.sort((a, b) => {
    if (a.cmsCategory?.renderType === CmsCategoryRenderType.SLIDER && b.cmsCategory?.renderType !== CmsCategoryRenderType.SLIDER) {
      return -1;
    }
    if (a.cmsCategory?.renderType !== CmsCategoryRenderType.SLIDER && b.cmsCategory?.renderType === CmsCategoryRenderType.SLIDER) {
      return 1;
    }
    if (a.cmsCategory?.renderType === CmsCategoryRenderType.CATEGORY && b.cmsCategory?.renderType !== CmsCategoryRenderType.CATEGORY) {
      return -1;
    }
    if (a.cmsCategory?.renderType !== CmsCategoryRenderType.CATEGORY && b.cmsCategory?.renderType === CmsCategoryRenderType.CATEGORY) {
      return 1;
    }
    return 0;
  });
};

 

const renderHomeConfig = (homeConfigItemModel: HomeConfigItemModel) => {
  switch (homeConfigItemModel.cmsCategory?.renderType) {
    case CmsCategoryRenderType.PRODUCT_GROUP: {
      return <GroupProduct data={homeConfigItemModel} />;
    }
    case CmsCategoryRenderType.SLIDER: {
      return (
        homeConfigItemModel?.cmsCategory?.linkDTOs && (
          <GroupSlider data={homeConfigItemModel?.cmsCategory?.linkDTOs} id={String(homeConfigItemModel.id)} />
        )
      );
    }
    case CmsCategoryRenderType.CATEGORY: {
      return (
        <CategoryGroup data={homeConfigItemModel} />
      )
    }
    default:
      return null;
  }
};
const HomePage = async () => {
  const homeConfig = await fetchHomeConfig();
  const sortedHomeConfig = sortHomeConfig(homeConfig?homeConfig:{});
  return (
    <div className="md:container md:mt-3">
      {sortedHomeConfig?.map((item: HomeConfigItemModel) => (
        <div key={item.id}>{renderHomeConfig(item)}</div>
      ))}
    </div>
  );
};

export default HomePage;
