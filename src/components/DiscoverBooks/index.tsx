import RelatedBook from '@/components/RelatedBook';
import { BookResponse } from '@/models/bookModel';

const RelatedBooks = ({ relatedBooks }: { relatedBooks: BookResponse }) => {
  return (
    <div className="my-3 w-full rounded-md">
      <h1 className="text-md w-full text-center font-semibold text-[--text-light-color]">
        - Khám phá thêm -
      </h1>
      <div>
        {relatedBooks?.data.length > 0 && <RelatedBook data={relatedBooks} />}
      </div>
    </div>
  );
};
export default RelatedBooks;
