import SearchHeader from '@/components/SearchInput';

import LeftHeader from './LeftHeader';
import RightHeader from './RightHeader';

const Header = async () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container m-auto flex w-full items-center justify-center py-1 md:py-2 lg:py-4">
        <LeftHeader />
        <SearchHeader />
        <RightHeader />
      </div>
    </header>
  );
};

export default Header;
