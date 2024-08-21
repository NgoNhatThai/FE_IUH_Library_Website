import { BOOK_ROUTE_URL } from '@/constants';
import { BookDetailResponse, BookResponse } from '@/models/bookModel';
import axios from 'axios';

export const bookService = {
  getTopViewBook: async (): Promise<BookResponse> => {
    return axios({
      baseURL: `${BOOK_ROUTE_URL}/get-top-views-book`,
      method: 'GET',
      headers: {},
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  getDetailBook: async (id: string): Promise<BookDetailResponse> => {
    return axios({
      baseURL: `${BOOK_ROUTE_URL}/get-detail-book/${id}`,
      method: 'GET',
      headers: {},
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};
