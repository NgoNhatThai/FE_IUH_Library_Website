'use client';
import CustomImage from '@/components/Image';
import { CATEGORIES_QUERY } from '@/constants';
import '@/css/global.css';
import { CategoryModel, OrganizationModel } from '@/models';
import { RootState } from '@/redux';
import { cmsCategoryService } from '@/services/cmsCategoryService';
import { QueryKey } from '@/types/api';
import { notFound, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Tab, TabList, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export interface CategoriesProps {
  categoryId: string;
}

const Categories = ({ categoryId }: CategoriesProps) => {
  const storeInfo = useSelector<RootState, OrganizationModel>(
    (state) => state?.storeStore?.storeInfo,
  );
  const fireStore = useSelector<RootState, any>((state) => state?.fire);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryModel | null>(null);
  const [selectedChildCategory, setSelectedChildCategory] =
    useState<CategoryModel | null>(null);
  const router = useRouter();
  const tabListRef = useRef<any>();
  const tabListChildrenRef = useRef<any>();
  const { data } = useQuery({
    queryKey: [QueryKey.CATEGORY, storeInfo?.id],
    queryFn: async () => {
      if (storeInfo?.id && categoryId) {
        const res = await cmsCategoryService.getCategorySearch({
          organizationId: storeInfo?.id,
          categoryId: categoryId,
        });
        return res.content;
      }
      return null;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && fireStore.isFired) {
      // set tabList
      const tabList = document.getElementById('tab_list');
      tabListRef.current = tabList?.children;
      // set selected tab
      const selectedTab = getIndexCategory(categoryId);
      setSelectedCategory(data[selectedTab]);
      if (
        data[selectedTab]?.children &&
        data[selectedTab]?.children.length > 0
      ) {
        setSelectedChildCategory(data[selectedTab].children[0]);
        tabListChildrenRef.current = tabListRef.current[selectedTab].children;
        router.push(`${CATEGORIES_QUERY}${data[selectedTab].children[0].id}`);
        const tabChildList = document.getElementById('tab-children-list');
        tabListChildrenRef.current = tabChildList?.children;
      } else if (selectedTab !== -1) {
        router.push(`${CATEGORIES_QUERY}${data[selectedTab].id}`);
      } else {
        notFound();
      }
      tabListRef.current[selectedTab].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [data, fireStore]);

  const handleOnSelect = (index: number) => {
    if (data) {
      const selectedCategory = data[index];
      setSelectedCategory(selectedCategory);
      if (selectedCategory?.children && selectedCategory?.children.length > 0) {
        setSelectedChildCategory(selectedCategory.children[0]);
        router.push(`${CATEGORIES_QUERY}${selectedCategory.children[0].id}`);
      } else {
        router.push(`${CATEGORIES_QUERY}${selectedCategory.id}`);
      }
      tabListRef.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };

  const handleSelectChildCategory = (index: number) => {
    if (selectedCategory?.children) {
      setSelectedChildCategory(selectedCategory.children[index]);
      router.push(`${CATEGORIES_QUERY}${selectedCategory.children[index].id}`);
      tabListChildrenRef.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };

  const getIndexCategory = (categoryId: string) => {
    const parentCategory = data?.find(
      (category: CategoryModel) => category.id === categoryId,
    );
    if (parentCategory) {
      return (
        data?.findIndex(
          (category: CategoryModel) => category.id === parentCategory.id,
        ) || 0
      );
    }
    let parentIndex = 0;
    data?.forEach((category: CategoryModel, index: number) => {
      if (category.children) {
        const childIndex = category.children.findIndex(
          (child: CategoryModel) => child.id === categoryId,
        );
        if (childIndex !== -1) {
          parentIndex = index;
        }
      }
    });
    return parentIndex;
  };

  return (
    <>
      {/* categories */}
      <Tabs
        selectedIndex={getIndexCategory(categoryId) || 0}
        selectedTabClassName="react-tabs__tab react-tabs__tab--selected !p-2 text-green-500"
        onSelect={(index) => handleOnSelect(index)}
      >
        <TabList
          className="flex w-full overflow-hidden overflow-x-auto"
          id="tab_list"
        >
          {data?.map((category: CategoryModel, index: number) => {
            return (
              <Tab key={category.id}>
                <div className="bg-grey-background border-grey-intermediate flex w-[60px] flex-grow cursor-pointer border">
                  <CustomImage
                    key={index}
                    avatarMetadata={category.avatarMetadata}
                    alt={category.name}
                  />
                </div>
                <p className="line-clamp-2 text-center text-[10px]">
                  {category.name}
                </p>
              </Tab>
            );
          })}
        </TabList>
      </Tabs>
      {/* child categories */}
      <Tabs
        selectedIndex={
          selectedCategory?.children?.findIndex(
            (category: CategoryModel) =>
              category.id === selectedChildCategory?.id,
          ) || 0
        }
        selectedTabClassName="react-tabs__tab react-tabs__tab--selected"
        onSelect={(index) => handleSelectChildCategory(index)}
      >
        <TabList
          className="flex w-full overflow-x-auto overflow-y-hidden"
          id="tab-children-list"
        >
          {selectedCategory?.children?.map(
            (category: CategoryModel, __index: number) => {
              return (
                <Tab
                  key={category.id}
                  className="flex w-full min-w-24 items-center justify-center p-2"
                >
                  <div className="flex h-full items-center justify-center">
                    <p className="line-clamp-2 text-center text-[10px]">
                      {category.name}
                    </p>
                  </div>
                </Tab>
              );
            },
          )}
        </TabList>
      </Tabs>
    </>
  );
};

export default Categories;
