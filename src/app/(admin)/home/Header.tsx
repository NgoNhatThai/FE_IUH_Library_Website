'use client';
import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';

type HeaderProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

const Header = ({ collapsed, toggleSidebar }: HeaderProps) => (
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
  </div>
);

export default Header;
