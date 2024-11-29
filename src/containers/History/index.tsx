'use client';
import { useEffect, useMemo, useState } from 'react';
import EmptyList from './EmptyList';
import SkeletonGlobal from '@/components/Skeleton';
import { BookModel } from '@/models/bookModel';
import { useQuery } from 'react-query';
import { QueryKey } from '@/types/api';
import { userService } from '@/services/userService';
import { userInfo } from '@/models/userInfo';
import FollowBookList from './ReadBookHistory';

const HistoryList = () => {
  const [history, setHistory] = useState<BookModel[] | null>(null);

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
    queryFn: async () => await userService.getUserReadHistory(params.userId),
    onSuccess: (data) => {
      const detailsArray = data.map((item: any) => item.detail);
      setHistory(detailsArray);
    },
    refetchOnWindowFocus: false,
    enabled: Boolean(userInfo),
  });

  useEffect(() => {
    if (!userInfo) {
      setHistory(null);
    }
  }, [history]);

  console.log(history);

  return (
    <div className="h-full md:container">
      {history ? (
        <>{history.length > 0 && <FollowBookList data={history} />}</>
      ) : (
        <SkeletonGlobal isLoading={isLoading} count={25} />
      )}
      {history && history?.length === 0 && <EmptyList />}
    </div>
  );
};
export default HistoryList;
