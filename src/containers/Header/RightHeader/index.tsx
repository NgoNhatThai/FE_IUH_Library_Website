'use client';
import Image from 'next/image';
import Link from 'next/link';
import BookIcon from '@/assets/svg/book-icon.svg';
import UserIcon from '@/assets/svg/user-icon.svg';
import MenuIcon from '@/assets/svg/menu.svg';
import CartWrapper from '../CartWrapper';
import Account from '../Account';
import { useRef, useState } from 'react';
import { userInfo } from '@/models/userInfo';
import AccountOptions from '../AccountOptions';
const RightHeader = () => {
  const storedUserInfo = localStorage.getItem('userInfo');
  const userInfo: userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const popupRef = useRef(null);

  return (
    <>
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
        <div className="relative" onClick={togglePopup}>
          <div className="ml-1 h-6 w-6 cursor-pointer items-center justify-center rounded-full md:ml-4 md:h-8 md:w-8">
            <Link href={userInfo ? '/' : '/login'}>
              <Account>
                <Image
                  src={userInfo ? userInfo.userRaw.avatar : UserIcon}
                  alt="User Account Icon"
                  width={1000}
                  height={1000}
                  className="h-6 w-6 rounded-full text-sky-500 md:h-8 md:w-8"
                />
              </Account>
            </Link>
          </div>
          <p className="ml-2 hidden text-sm md:block">
            {userInfo && userInfo.userRaw && userInfo.userRaw.userName
              ? userInfo.userRaw.userName
              : 'Đăng nhập'}
          </p>
        </div>
      </div>
      <AccountOptions
        showPopup={showPopup}
        popupRef={popupRef}
        setShowPopup={setShowPopup}
        userInfo={userInfo}
      />
    </>
  );
};
export default RightHeader;
