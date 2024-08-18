import RelatedProduct from '@/components/RelatedProduct';
import { ProductModel } from '@/models';
import { ListResponse } from '@/types/api';

const DiscoverProducts = ({
  relatedProducts,
}: {
  relatedProducts: ListResponse<ProductModel>;
}) => {
  return (
    <div className="my-3 w-full rounded-md">
      <h1 className="text-md w-full text-center font-semibold text-[--text-light-color]">
        - Khám phá thêm -
      </h1>
      <div>
        {relatedProducts?.totalElements > 0 && (
          <RelatedProduct data={relatedProducts} />
        )}
      </div>
    </div>
  );
};
export default DiscoverProducts;
