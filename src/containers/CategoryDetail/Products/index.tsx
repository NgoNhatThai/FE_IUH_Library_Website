'use client';
import { OrganizationModel, ProductModel } from '@/models';
import { RootState } from '@/redux';
import { useSelector } from 'react-redux';
import { CategoriesProps } from '../Categories';
import { productService } from '@/services/productService';
import { QueryKey } from '@/types/api';
import { useQuery } from 'react-query';
import CartItemHome from '@/components/BookItem';
import { useRouter } from 'next/navigation';
// import { PRODUCT } from '@/constants';
import SpinnerLoader from '@/components/SpinnerLoader';

const Products = ({ categoryId }: CategoriesProps) => {
  const storeInfo = useSelector<RootState, OrganizationModel>(
    (state) => state?.storeStore?.storeInfo,
  );
  const router = useRouter();
  const { data: productData, isLoading } = useQuery({
    queryKey: [QueryKey.PRODUCT, storeInfo?.id, categoryId],
    queryFn: async () => {
      return (
        storeInfo?.id &&
        (await productService.products({
          organizationId: storeInfo?.id,
          categoryId: categoryId,
        }))
      );
    },
    // refetchOnWindowFocus: false,
    // enabled: Boolean(storeInfo?.id),
  });

  const handleOnClick = (product: ProductModel) => {
    // router.push(`${PRODUCT}/${product.id}`);
  };

  return (
    <div>
      {isLoading && <SpinnerLoader />}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:space-x-5">
        {productData &&
          productData?.content.map((product: ProductModel) => {
            return (
              <span key={product.id} onClick={() => handleOnClick(product)}>
                <CartItemHome data={product} />
              </span>
            );
          })}
      </div>
      {productData && productData?.empty && (
        <div>
          <p className="text-center text-sm text-[--text-light-color]">
            Không có sản phẩm
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
