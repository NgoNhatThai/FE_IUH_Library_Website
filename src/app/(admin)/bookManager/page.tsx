'use client';
import React, { useState } from 'react';
import { Table, Button, Image, Space, Input, Popover } from 'antd';
import {
  PlusOutlined,
  SettingOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const BookManagerPage = () => {
  const router = useRouter();
  const navigateToPage = (path: string) => {
    router.push(path);
  };
  const [searchTerm, setSearchTerm] = useState('');

  const data = [
    {
      id: 1,
      title: 'Harry Potter và Hòn Đá Phù Thủy',
      category: 'Tiểu thuyết',
      major: 'Văn học',
      author: 'J.K. Rowling',
      price: 100000,
      image:
        'https://res.cloudinary.com/iuhcloundlibrary/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1724377719/category_klkwdq.jpg',
    },
    {
      id: 2,
      title: 'Có công mài sắt có ngày nên kim',
      category: 'Văn học',
      major: 'Văn học',
      author: 'Nguyễn Du',
      price: 120000,
      image:
        'https://res.cloudinary.com/iuhcloundlibrary/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1724377719/category_klkwdq.jpg',
    },
    {
      id: 3,
      title: 'Lập trình không khó',
      category: 'Khoa học',
      major: 'Công nghệ',
      author: 'John Doe',
      price: 150000,
      image:
        'https://res.cloudinary.com/iuhcloundlibrary/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1724377719/category_klkwdq.jpg',
    },
    {
      id: 4,
      title: 'Tư duy nhanh và chậm',
      category: 'Tâm lý',
      major: 'Khoa học',
      author: 'Daniel Kahneman',
      price: 180000,
      image:
        'https://res.cloudinary.com/iuhcloundlibrary/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1724377719/category_klkwdq.jpg',
    },
    {
      id: 5,
      title: 'Đắc nhân tâm',
      category: 'Kỹ năng sống',
      major: 'Phát triển bản thân',
      author: 'Dale Carnegie',
      price: 130000,
      image:
        'https://res.cloudinary.com/iuhcloundlibrary/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1724377719/category_klkwdq.jpg',
    },
  ];

  const filteredData = data.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const optionsMenu = (
    <div className="flex flex-col space-y-2">
      <Button type="text" onClick={() => alert('Sửa sách')}>
        Sửa
      </Button>
      <Button type="text" onClick={() => alert('Xóa sách')}>
        Xóa
      </Button>
      <Button type="text" onClick={() => alert('Thêm Chapter')}>
        Thêm Chapter
      </Button>
    </div>
  );

  const columns = [
    {
      title: 'Ảnh sách',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => (
        <Image width={50} src={text} alt="book image" />
      ),
    },
    {
      title: 'Tên sách',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Chuyên ngành',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <span>
          {price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      ),
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
    },
  ];

  return (
    <div className="container w-full rounded-md bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-3xl font-bold">Quản lý sách</p>
        <div className="flex items-center space-x-2">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
            onClick={() => navigateToPage('/addBook')}
          >
            Thêm Sách
          </Button>
          <Input
            placeholder="Tìm sách, tác giả, danh mục..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300, height: 40 }}
          />
          <Button type="primary" icon={<SearchOutlined />}>
            Tìm
          </Button>
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
        rowKey="id"
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

export default BookManagerPage;
