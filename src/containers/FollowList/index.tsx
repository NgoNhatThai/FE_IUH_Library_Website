'use client';
import { useEffect, useMemo, useState } from 'react';
import EmptyList from './EmptyList';
import SkeletonGlobal from '@/components/Skeleton';
import { BookModel } from '@/models/bookModel';
import { useQuery } from 'react-query';
import { QueryKey } from '@/types/api';
import { userService } from '@/services/userService';
import { userInfo } from '@/models/userInfo';
import FollowBookList from './FollowBookList';

const ShoppingCart = () => {
  const [followBook, setFollowBook] = useState<BookModel[] | null>(null);

  const storedUserInfo =
    typeof window !== 'undefined' ? localStorage.getItem('userInfo') : '';
  const userInfo: userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  const params = useMemo(() => {
    return {
      userId: userInfo?.userRaw?._id,
      pageIndex: 0,
      pageSize: 10,
    };
  }, [userInfo]);

  const { isLoading } = useQuery({
    queryKey: [QueryKey.CMS, userInfo?.userRaw?._id],
    queryFn: async () => await userService.getFollowList(params),
    onSuccess: (data) => {
      setFollowBook(data);
    },
    refetchOnWindowFocus: false,
    enabled: Boolean(userInfo),
  });

  useEffect(() => {
    if (!userInfo) {
      setFollowBook(null);
    }
  }, [followBook]);

  return (
    <div className="h-full md:container">
      {followBook ? (
        <>{followBook.length > 0 && <FollowBookList data={followBook} />}</>
      ) : (
        <SkeletonGlobal isLoading={isLoading} count={25} />
      )}
      {followBook && followBook?.length === 0 && <EmptyList />}
    </div>
  );
};
export default ShoppingCart;
