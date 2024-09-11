'use client';
import Image from 'next/image';
import Link from 'next/link';
import BookIcon from '@/assets/svg/book-icon.svg';
import UserIcon from '@/assets/svg/user-icon.svg';
import MenuIcon from '@/assets/svg/menu.svg';
import CartWrapper from '../CartWrapper';
import Account from '../Account';
import { useEffect, useRef, useState } from 'react';
import { userInfo } from '@/models/userInfo';
const RightHeader = () => {
  const storedUserInfo = localStorage.getItem('userInfo');
  const userInfo: userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const popupRef = useRef(null);

  //   const handleClickOutside = (event: any) => {
  //     if (popupRef.current && !Array(popupRef.current).includes(event.target)) {
  //       setShowPopup(false);
  //     }
  //   };

  //   useEffect(() => {
  //     document.addEventListener('mousedown', handleClickOutside);
  //     return () => {
  //       document.removeEventListener('mousedown', handleClickOutside);
  //     };
  //   }, [popupRef]);

  useEffect(() => {}, [userInfo]);

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
        {showPopup && userInfo && (
          <div
            className="absolute right-8 top-8 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg"
            ref={popupRef}
            onBlur={() => setShowPopup(false)}
          >
            <div className="flex flex-col items-center justify-between rounded-lg border-b border-gray-200 bg-orange-100 p-2">
              <div className="h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-zinc-950 md:h-8 md:w-8">
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
              <p className="text-center text-sm font-medium">
                {userInfo?.userRaw?.userName ?? ''}
              </p>
              <p className="text-center text-sm font-medium">
                {userInfo?.userRaw?.studentCode ?? ''}
              </p>
            </div>
            <ul className="py-1">
              <li className="border-b">
                <button
                  onClick={() => {
                    console.log('User logged out');
                  }}
                  className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                >
                  Trang cá nhân
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem('userInfo');
                    localStorage.removeItem('@access_token');
                    window.location.href = '/';
                  }}
                  className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                >
                  <p className="font-medium text-red-500">Đăng xuất</p>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
export default RightHeader;
