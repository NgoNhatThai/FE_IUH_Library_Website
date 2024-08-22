'use client';
// import { OrganizationModel, ProductModel } from '@/models';
// import { RootState } from '@/redux';
// import { ListResponse } from '@/types/api';
import React from 'react';
// import { useSelector } from 'react-redux';
import Breadcrumb from '../../components/Breadcrumb';
import DetailProductInfo from './DetailBookInfo';
// import ButtonFooter from './ButtonFooter';
import { BookModel } from '@/models/bookModel';
import ChapterContainer from './BookChapters';

const DetailBook = ({ detail }: { detail: BookModel }) => {
  // const [relatedProducts, setRelatedProducts] =
  //   useState<ListResponse<ProductModel>>();

  // const storeInfo = useSelector<RootState, OrganizationModel>(
  //   (state) => state.storeStore.storeInfo,
  // );

  // const fetchRelatedProducts = async () => {
  //   try {
  //     const relatedProducts = await productService.products({
  //       pageIndex: 0,
  //       pageSize: 10,
  //       isHaveChildren: false,
  //       status: 'ACTIVE',
  //       display: true,
  //       categoryId: detailProduct?.productCategoryDTO?.id,
  //       sortBy: 'totalSales',
  //       ascending: false,
  //       organizationId: storeInfo?.id,
  //     });
  //     if (relatedProducts) {
  //       setRelatedProducts(relatedProducts);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   if (detailProduct && storeInfo?.id) {
  //     fetchRelatedProducts();
  //   }
  // }, [storeInfo, detailProduct]);

  return (
    <div className="container shadow-md">
      <div className="hidden md:block">
        <Breadcrumb title={'Chi tiết sản phẩm'} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <DetailProductInfo data={detail} />
        {/* {relatedProducts && (
        <DiscoverProducts relatedProducts={relatedProducts} />
      )} */}
        <div className="border-l p-4">
          <ChapterContainer data={detail} />
        </div>
        {/* <ButtonFooter data={detail} /> */}
      </div>
    </div>
  );
};

export default DetailBook;
