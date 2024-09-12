import SearchedBook from '@/containers/SearchedBook';

const ResultSearchPage = async () => {
  return (
    <div
      id="main-search-product"
      className="flex max-h-screen flex-col bg-[--background-light-color]"
    >
      <SearchedBook />
    </div>
  );
};

export default ResultSearchPage;
