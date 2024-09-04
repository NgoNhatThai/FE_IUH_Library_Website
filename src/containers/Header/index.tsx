import BookIcon from '@/assets/svg/book-icon.svg';
import UserIcon from '@/assets/svg/user-icon.svg';
import MenuIcon from '@/assets/svg/menu.svg';
import SearchHeader from '@/components/SearchInput';
import Image from 'next/image';
import Link from 'next/link';
import LeftHeader from './LeftHeader';
import CartWrapper from './CartWrapper';
import Account from './Account';

const Header = async () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container m-auto flex w-full items-center justify-center py-1 md:py-2 lg:py-4">
        <LeftHeader />
        <SearchHeader />
        <div className="flex flex-col items-center">
          <div className="ml-1 h-6 w-6 cursor-pointer items-center justify-center rounded-full md:ml-4 md:h-8 md:w-8">
            <Link href="/">
              <CartWrapper>
                <Image
                  src={MenuIcon}
                  alt="Menu Icon"
                  width={1000}
                  height={1000}
                  className="text-sky-500"
                />
              </CartWrapper>
            </Link>
          </div>
          <p className="ml-2 hidden text-sm md:block">Menu</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="ml-1 h-6 w-6 cursor-pointer items-center justify-center rounded-full md:ml-4 md:h-8 md:w-8">
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
          <p className="ml-2 hidden text-sm md:block">Yêu thích</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="ml-1 h-6 w-6 cursor-pointer items-center justify-center rounded-full md:ml-4 md:h-8 md:w-8">
            <Link href="/login">
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
          <p className="ml-2 hidden text-sm md:block">Đăng nhập</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
