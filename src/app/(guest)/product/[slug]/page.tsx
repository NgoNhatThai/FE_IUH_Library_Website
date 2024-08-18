import DetailProduct from '@/containers/DetailProduct';
import NotFoundDetail from '@/containers/DetailProduct/NotFoundDetail';
import { productService } from '@/services/productService';

const getDetailProduct = async (id: string) => {
  try {
    return await productService.getProductById(id);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const DetailProductPage = async ({ params }: { params: { slug: string } }) => {
  const detail = await getDetailProduct(params.slug);
  return detail ? <DetailProduct detailProduct={detail} /> : <NotFoundDetail />;
};
export default DetailProductPage;
