'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import DetailProductInfo from './DetailBookInfo';
import { BookModel, BookResponse } from '@/models/bookModel';
import ChapterContainer from './BookChapters';
import { bookService } from '@/services/bookService';
import RelatedBooks from '@/components/DiscoverBooks';
import CommentContainer from '@/components/CommentContainer';
import { CommentModel } from '@/models/commentModel';
import { useQuery } from 'react-query';
import { QueryKey } from '@/types/api';
import { userService } from '@/services/userService';
import { UserModal } from '@/models/userInfo';

const DetailBook = ({ detail }: { detail: BookModel }) => {
  const [relatedBooks, setRelatedBooks] = useState<BookResponse>();

  const fetchRelatedBooks = async () => {
    try {
      const relatedBooks = await bookService.getRelatedBooks(
        String(detail._id),
      );
      if (relatedBooks) {
        setRelatedBooks(relatedBooks);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isCommentModelArray = (array: any[]): array is CommentModel[] => {
    return array.every(
      (item) =>
        item && typeof item === 'object' && '_id' in item && 'content' in item,
    );
  };
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const user: UserModal = useMemo(() => {
    return userInfo ? userInfo.userRaw : null;
  }, [userInfo]);
  const { data: userBookMark } = useQuery({
    queryKey: [QueryKey.USER_BOOKMARK],
    queryFn: async () =>
      await userService.getUserBookMark(String(user?._id), String(detail._id)),
    refetchOnWindowFocus: false,
    enabled: Boolean(detail._id),
  });

  const isBuy = useMemo(() => {
    if (userBookMark && userBookMark.isBuy) {
      return true;
    }
    return false;
  }, [userBookMark]);

  useEffect(() => {
    if (detail) {
      fetchRelatedBooks();
    }
  }, [detail]);

  return (
    <div className="bg-white shadow-md md:container">
      <div className="hidden md:block">
        <Breadcrumb title={'Chi tiết sách'} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <DetailProductInfo data={detail} />
        </div>

        <div className="border-l p-4">
          {isBuy || (detail?.price === 0 && <ChapterContainer data={detail} />)}
          <CommentContainer
            currentId={detail._id}
            comments={
              typeof detail?.review === 'object' &&
              Array.isArray(detail?.review?.comments) &&
              isCommentModelArray(detail.review.comments)
                ? detail.review.comments
                : []
            }
            isChapterComment={false}
          />
        </div>
      </div>
      <div className="mt-2 md:mt-10 md:w-1/2">
        {relatedBooks && <RelatedBooks relatedBooks={relatedBooks} />}
      </div>
    </div>
  );
};

export default DetailBook;
