import { homeConfigService } from '@/services/homeConfigService';
import MenuSelection from './MenuSelection';
const fetchHomeConfig = async () => {
  try {
    const homeConfigData = await homeConfigService.getConfig();
    if (!homeConfigData) return null;
    return homeConfigData;
  } catch (error) {
    console.log(error);
  }
};

const Menu = async () => {
  const homeConfigData = await fetchHomeConfig();

  return (
    <div className="h-full w-full bg-almost-white p-2">
      <div className="container flex w-full items-center">
        <div className="flex flex-row flex-wrap">
          {homeConfigData?.data?.categories?.map((item: any) => {
            return (
              <MenuSelection
                key={item.id}
                href={item.href}
                title={item.name}
                id={item.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
