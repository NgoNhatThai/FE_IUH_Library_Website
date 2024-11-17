'use client';
import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: 'Trang chủ', key: '/home', icon: <HomeOutlined /> },
    {
      label: 'Quản lý',
      key: 'sub1',
      icon: <AppstoreOutlined />,
      children: [
        { label: 'Sách', key: '/bookManager', icon: <BookOutlined /> },
        {
          label: 'Danh mục',
          key: '/catergorManager',
          icon: <AppstoreOutlined />,
        },
        { label: 'Tác giả', key: '/authorManager', icon: <AppstoreOutlined /> },
        {
          label: 'Chuyên ngành',
          key: '/majorManager',
          icon: <AppstoreOutlined />,
        },
        { label: 'Thống kê', key: '/overview', icon: <BarChartOutlined /> },
        {
          label: 'Ngân hàng',
          key: '/bank',
          icon: <BarChartOutlined />,
        },
        {
          label: 'Yêu cầu nạp tiền',
          key: '/requestManager',
          icon: <BarChartOutlined />,
        },
        { label: 'Tài khoản', key: '/accounts', icon: <UserOutlined /> },
        // { label: 'adđ', key: '/addAllChapter', icon: <UserOutlined /> },
      ],
    },
  ];

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[pathname]}
      defaultOpenKeys={['sub1']}
      items={menuItems}
      onClick={({ key }) => router.push(key)}
    />
  );
};

export default Sidebar;
