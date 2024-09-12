'use client';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import DetailProductInfo from './DetailBookInfo';
import { BookModel, BookResponse } from '@/models/bookModel';
import ChapterContainer from './BookChapters';
import { bookService } from '@/services/bookService';
import RelatedBooks from '@/components/DiscoverBooks';

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
  useEffect(() => {
    if (detail) {
      fetchRelatedBooks();
    }
  }, [detail]);

  return (
    <div className="shadow-md md:container">
      <div className="hidden md:block">
        <Breadcrumb title={'Chi tiết sách'} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <DetailProductInfo data={detail} />
        </div>

        <div className="border-l p-4">
          <ChapterContainer data={detail} />
        </div>
      </div>
      <div className="mt-2 md:mt-10 md:w-1/2">
        {relatedBooks && <RelatedBooks relatedBooks={relatedBooks} />}
      </div>
    </div>
  );
};

export default DetailBook;