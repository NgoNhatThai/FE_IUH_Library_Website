'use client';
import { adminService } from '@/services/adminService';
import { QueryKey } from '@/types/api';
import { SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Input, Popover, Space, Table } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const AccountManagerPage = () => {
  const router = useRouter();
  const navigateToPage = (path: string) => {
    router.push(path);
  };
  const [searchTerm, setSearchTerm] = useState('');

  const { data: account, refetch: refetchaccount } = useQuery(
    [QueryKey.AUTHOR],
    async (): Promise<
      {
        userName: string;
        avatar: string;
        studentCode: string;
        status: string;
        createdAt: string;
        _id: string;
        majorId: string;
      }[]
    > => {
      return await adminService.getAllaccount();
    },
  );

  const filteredData = (account || []).filter(
    (author) =>
      author.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.studentCode.toString().includes(searchTerm),
  );
  console.log('account', account);
  const optionsMenu = (
    <div className="flex flex-col space-y-2">
      <Button type="text" onClick={() => alert('Sửa tác giả')}>
        Sửa
      </Button>
      <Button type="text" onClick={() => alert('Xóa tác giả')}>
        Xóa
      </Button>
    </div>
  );

  const columns = [
    {
      title: 'Ảnh đại diện',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (name: string) =>
        name ? (
          <img
            src={name}
            alt="avatar"
            className="rounded-full"
            style={{ width: 60, height: 60 }}
          />
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="avatar"
            className="rounded-full"
            style={{ width: 60, height: 60 }}
          />
        ),
      width: 110,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'userName',
      key: 'userName',
      render: (userName: string) => <p>{userName}</p>,
      width: 170,
    },
    {
      title: 'MSSV',
      dataIndex: 'studentCode',
      key: 'studentCode',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span style={{ color: status === 'ACTIVE' ? 'green' : 'red' }}>
          {status}
        </span>
      ),
      width: 80,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => dayjs(createdAt).format('DD-MM-YYYY'),
      width: 85,
    },
    {
      title: 'Tùy chỉnh',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Popover content={optionsMenu} trigger="click">
            <Button type="text" icon={<SettingOutlined />} />
          </Popover>
        </Space>
      ),
      width: 90,
    },
  ];

  return (
    <div className="container w-full rounded-md bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-3xl font-bold">Quản lý tác giả</p>
        <div className="flex items-center space-x-2">
          {/* <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
            onClick={() => navigateToPage('/addAuthor')}
          >
            Thêm
          </Button> */}
          <Input
            placeholder="Tìm tài khoản"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300, height: 40 }}
          />
          {/* <Button type="primary" icon={<SearchOutlined />}>
            Tìm
          </Button> */}
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          pageSize: 5,
          pageSizeOptions: ['5', '10'],
          showSizeChanger: true,
        }}
        rowKey="_id"
        className="rounded-md shadow-md"
        components={{
          header: {
            cell: ({
              children,
              ...restProps
            }: {
              children: React.ReactNode;
              [key: string]: any;
            }) => (
              <th
                {...restProps}
                style={{
                  backgroundColor: '#e6f7ff',
                  color: '#1890ff',
                  fontWeight: 'bold',
                }}
              >
                {children}
              </th>
            ),
          },
        }}
        style={{
          overflow: 'hidden',
        }}
      />
    </div>
  );
};

export default AccountManagerPage;
