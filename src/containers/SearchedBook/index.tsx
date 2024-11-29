'use client';
import BookItem from '@/components/BookItem';
import { BookModel, BookResponse } from '@/models/bookModel';
import { bookService } from '@/services/bookService';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import EmptyBookIcon from '@/assets/svg/book-empty.svg';
import Image from 'next/image';

const fetchData = async (
  searchText?: string,
  categoryId?: string,
  authorId?: string,
  majorId?: string,
) => {
  try {
    if (!searchText && !categoryId && !authorId && !majorId) {
      return [];
    }

    let response = {} as BookResponse;

    if (searchText && searchText.length > 0) {
      response = await bookService.getBookByText(searchText);
    } else if (categoryId && categoryId.length > 0) {
      response = await bookService.getBookByCategory(categoryId);
    } else if (authorId && authorId.length > 0) {
      response = await bookService.getBookByAuthor(authorId);
    } else if (majorId && majorId.length > 0) {
      response = await bookService.getBookByMajor(majorId);
    }

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const SearchedBook = () => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get('searchText');
  const categoryId = searchParams.get('categoryId');
  const authorId = searchParams.get('authorId');
  const majorId = searchParams.get('majorId');

  const [data, setData] = useState<BookModel[]>([]);
  const inputText = useMemo(() => {
    return () => {
      if (searchText !== null) {
        return searchText;
      }
      if (categoryId) {
        if (data.length > 0) {
          return (
            'Danh mục ' +
            (typeof data[0].categoryId === 'object'
              ? data[0].categoryId?.name
              : '')
          );
        } else return;
      }
      if (authorId) {
        return 'Tác giả';
      }
      if (majorId) {
        return 'Chuyên ngành';
      }
    };
  }, [searchText, categoryId, authorId, majorId]);

  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedData = await fetchData(
        searchText ?? undefined,
        categoryId ?? undefined,
        authorId ?? undefined,
        majorId ?? undefined,
      );
      if (fetchedData) {
        setData(fetchedData);
      }
    };

    fetchBooks();
  }, [searchText, categoryId, authorId, majorId]);

  return (
    <div className="h-full bg-white md:container">
      {data.length > 0 ? (
        <>
          <div>
            <p className="text-md flex rounded-md border border-white p-2 font-semibold text-gray-400">
              Kết quả tìm kiếm cho: {inputText()}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-white md:grid-cols-4">
            {Array.isArray(data) && data.length ? (
              data.map((item, index) => (
                <div
                  key={index}
                  className="overflow-hidden p-2 shadow-md transition-transform duration-300 hover:scale-105"
                  onClick={() => {
                    router.push(`/book/${item._id}`);
                  }}
                >
                  <BookItem data={item} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No items found</p>
            )}
          </div>
        </>
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <p className="text-md mb-5 text-center italic text-gray-400">
              Không tìm thấy kết quả tìm kiếm
            </p>
            <div
              onClick={() => {
                window.location.href = '/';
              }}
              className="focus:shadow-outline flex min-h-20 w-4/5 cursor-pointer flex-col items-center rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              <Image
                src={EmptyBookIcon}
                className="h-40 w-40"
                alt="Empty Book Icon"
                height={1000}
                width={1000}
              />
              <p>Khám phá thế giới sách của riêng bạn</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchedBook;
