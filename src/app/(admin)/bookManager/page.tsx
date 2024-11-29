'use client';
import React, { useState } from 'react';
import { Table, Button, Image, Space, Input, Popover } from 'antd';
import {
  PlusOutlined,
  SettingOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { QueryKey } from '@/types/api';
import { bookService } from '@/services/bookService';

const BookManagerPage = () => {
  const router = useRouter();
  const navigateToPage = (path: string) => {
    router.push(path);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data: books, refetch: refetchBooks } = useQuery(
    [QueryKey.BOOK, current, pageSize],
    async () => {
      return await bookService.getAllBook(current - 1, pageSize);
    },
  );

  const filteredData = books?.data.filter(
    (book: any) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authorId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.categoryId.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const optionsMenu = (recod: any) => (
    <div className="flex flex-col space-y-2">
      <Button type="text" onClick={() => alert('Sửa sách')}>
        Sửa
      </Button>
      <Button type="text" onClick={() => alert('Xóa sách')}>
        Xóa
      </Button>
      {recod?.status === 'ISWRITE' && (
        <Button
          type="text"
          onClick={() => {
            localStorage.setItem('@bookId', recod?._id);
            router.push(`/addOneChapter?id=${recod?._id}`);
          }}
        >
          Thêm Chapter
        </Button>
      )}
    </div>
  );

  // Define columns for the table
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
      dataIndex: 'authorId',
      key: 'authorId',
      render: (author: any) => author?.name,
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (category: any) => category?.name,
    },
    {
      title: 'Chuyên ngành',
      dataIndex: 'majorId',
      key: 'majorId',
      render: (major: any) => major?.name,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) =>
        price
          ? price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })
          : 'Miễn phí',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => (
        <span style={{ color: active ? 'green' : 'red' }}>
          {active ? 'ACTIVE' : 'INACTIVE'}
        </span>
      ),
    },
    {
      title: 'Tùy chỉnh',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Popover content={optionsMenu(record)} trigger="click">
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
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          current,
          pageSize,
          total: books?.total,
          onChange: (page, pageSize) => {
            setCurrent(page);
            setPageSize(pageSize);
            refetchBooks();
          },
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

export default BookManagerPage;
