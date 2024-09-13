'use client';
import Image from 'next/image';
import Link from 'next/link';
import BookIcon from '@/assets/svg/book-icon.svg';
import UserIcon from '@/assets/svg/user-icon.svg';
import BellIcon from '@/assets/svg/bell-icon.svg';
import CartWrapper from '../CartWrapper';
import Account from '../Account';
import { useMemo, useRef, useState } from 'react';
import { userInfo } from '@/models/userInfo';
import AccountOptions from '../AccountOptions';
import { QueryKey } from '@/types/api';
import { useQuery } from 'react-query';
import { userService } from '@/services/userService';
const RightHeader = () => {
  const storedUserInfo = localStorage.getItem('userInfo');
  const userInfo: userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const popupRef = useRef(null);

  const { data: notificationData, isLoading } = useQuery({
    queryKey: [QueryKey.NOTIFICATION, userInfo?.userRaw?._id],
    queryFn: async () => {
      if (userInfo && userInfo.userRaw && userInfo.userRaw._id)
        return await userService.getNotification(userInfo.userRaw._id);
      return null;
    },
    refetchOnWindowFocus: false,
  });

  const unReadNotification = useMemo(() => {
    return notificationData;
  }, [notificationData]);

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        <div className="ml-1 h-6 w-6 cursor-pointer items-center justify-center rounded-full md:ml-4 md:h-8 md:w-8">
          <Link href="/">
            <div className="relative">
              <Image
                src={BellIcon}
                alt="Notification Icon"
                width={1000}
                height={1000}
                className="text-sky-500"
              />
              {/* Vòng tròn đỏ */}
              {!isLoading &&
                unReadNotification &&
                unReadNotification.length > 0 && (
                  <span className="absolute right-0 top-0 block h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full border border-white bg-red-500">
                    KKKKKKKKKKKKKKKK
                  </span>
                )}
            </div>
          </Link>
        </div>
        <p className="ml-2 hidden text-sm md:block">Thông báo</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="ml-1 h-6 w-6 cursor-pointer items-center justify-center rounded-full md:ml-4 md:h-8 md:w-8">
          <Link href="/follow-list">
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
      <div
        className="relative flex flex-col items-center justify-center"
        onClick={togglePopup}
      >
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
      <AccountOptions
        showPopup={showPopup}
        popupRef={popupRef}
        setShowPopup={setShowPopup}
        userInfo={userInfo}
      />
    </div>
  );
};
export default RightHeader;
