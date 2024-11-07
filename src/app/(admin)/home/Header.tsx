'use client';
import React, { useRef, useState } from 'react'; // Import useState
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import Account from '@/containers/Header/Account';
import Image from 'next/image';
import { userInfo } from '@/models/userInfo';
import Link from 'next/link';
import AccountOptions from '@/containers/Header/AccountOptions';

type HeaderProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

const Header = ({ collapsed, toggleSidebar }: HeaderProps) => {
  const storedUserInfo = localStorage.getItem('userInfo');
  const user: userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <div className="flex items-center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleSidebar}
          className="mr-2 text-white"
        />
        <h1 className="text-xl">Trang quản trị</h1>
      </div>

      <div
        className="relative flex flex-col items-center justify-center"
        onClick={togglePopup}
      >
        <div className="ml-1 h-6 w-6 cursor-pointer items-center justify-center rounded-full md:ml-4 md:h-8 md:w-8">
          <Link href={user ? '#' : '/login'}>
            <Account>
              {user && user.userRaw && user.userRaw.avatar ? (
                <Image
                  src={user.userRaw.avatar}
                  alt="User Account Icon"
                  width={1000}
                  height={1000}
                  className="h-6 w-6 rounded-full text-sky-500 md:h-8 md:w-8"
                />
              ) : (
                <UserOutlined style={{ fontSize: '24px', color: '#00BFFF' }} />
              )}
            </Account>
          </Link>
        </div>
      </div>
      <AccountOptions
        showPopup={showPopup}
        popupRef={popupRef}
        setShowPopup={setShowPopup}
        userInfo={user}
      />
    </div>
  );
};

export default Header;
