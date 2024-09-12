'use client';
import BookItem from '@/components/BookItem';
import Breadcrumb from '@/components/Breadcrumb';
import PaginationFooter from '@/components/PaginationFooter';
import { BookModel } from '@/models/bookModel';
import { useRouter } from 'next/navigation';

interface FollowBookListProps {
  data: BookModel[];
}

const FollowBookList = ({ data }: FollowBookListProps) => {
  const router = useRouter();
  const params = {
    pageIndex: 0,
    pageSize: 10,
    totalPages: 10,
  };
  return (
    <div className="relative h-screen rounded-md bg-white p-2 md:p-4">
      <Breadcrumb title="Danh sách theo dõi" />
      <div className="relative p-2 pb-16">
        <div className="grid grid-cols-2 gap-4 bg-white md:grid-cols-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden p-2 shadow-md transition-transform duration-300 hover:scale-105"
              onClick={() => router.push(`/book/${item._id}`)}
            >
              <BookItem data={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 w-[96%] items-center justify-center">
        <PaginationFooter params={params} />
      </div>
    </div>
  );
};

export default FollowBookList;
