import Breadcrumb from '@/components/Breadcrumb';
import DetailNew from './components';

const NewPage = ({ slug }: { slug: string }) => {
  return (
    <div className="container mx-auto">
      <div className="hidden md:block">
        <Breadcrumb title="Chi tiết bài viết" />
      </div>
      <DetailNew slug={slug} />
    </div>
  );
};
export default NewPage;
