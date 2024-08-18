import BookIcon from '@/assets/svg/book-icon.svg';
import UserIcon from '@/assets/svg/user-icon.svg';
import SearchHeader from '@/components/SearchInput';
import Image from 'next/image';
import Link from 'next/link';
import LeftHeader from './LeftHeader';
import CartWrapper from './CartWrapper';
import Account from './Account';

const Header = async () => {
  return (
    <header className="bg-white">
      <div className="container m-auto flex w-full items-center justify-between py-1 md:py-2 lg:py-4">
        <div className="w-1/10 h-full items-center">
          <LeftHeader />
        </div>
        <SearchHeader />
        <div className="ml-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full md:ml-4">
          <Link href="/shopping-cart">
            <CartWrapper>
              <Image
                src={BookIcon}
                alt="Follow list book"
                width={1000}
                height={1000}
                className="text-sky-500"
              />
            </CartWrapper>
          </Link>
        </div>
        <div className="ml-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full md:ml-4">
          <Link href="/shopping-cart">
            <Account>
              <Image
                src={UserIcon}
                alt="User Account Icon"
                width={1000}
                height={1000}
                className="text-sky-500"
              />
            </Account>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
