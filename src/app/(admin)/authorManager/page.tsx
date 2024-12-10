'use client';
import React, { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Input,
  Popover,
  Modal,
  Form,
  DatePicker,
} from 'antd';
import {
  PlusOutlined,
  SettingOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { QueryKey } from '@/types/api';
import { adminService } from '@/services/adminService';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import { useForm } from 'antd/es/form/Form';
import { AuthorModel, AuthorStatus } from '@/models/authorModel';
import { toast } from 'react-toastify';
import TextArea from 'antd/es/input/TextArea';

const AuthorManagerPage = () => {
  const router = useRouter();
  const navigateToPage = (path: string) => {
    router.push(path);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [formAuthor] = useForm<AuthorModel>();
  const [isModalAuthor, setIsModalAuthor] = useState(false);

  const handleOkModalAuthor = async () => {
    try {
      const values = await formAuthor.validateFields([
        'name',
        'desc',
        'birthDate',
      ]);
      const data: AuthorModel = {
        name: values.name,
        desc: values.desc,
        birthDate: values.birthDate,
        status: AuthorStatus.ACTIVE,
      };
      await adminService.createAuthor(data);
      toast.success('Thêm tác giả thành công!');
      formAuthor.resetFields();
      refetchAuthors();
      setIsModalAuthor(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };
  const { data: authors, refetch: refetchAuthors } = useQuery(
    [QueryKey.AUTHOR],
    async (): Promise<
      {
        name: string;
        birthDate: string;
        desc: string;
        status: string;
        createdAt: string;
        _id: string;
      }[]
    > => {
      return await adminService.getAllAuthor();
    },
  );

  const filteredData = (authors || []).filter((author) =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
      title: 'Tên tác giả',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span className="font-semibold">{name}</span>,
      width: 150,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthDate',
      key: 'birthDate',
      render: (birthDate: string) => dayjs(birthDate).format('DD-MM-YYYY'),
      width: 80,
    },
    {
      title: 'Mô tả',
      dataIndex: 'desc',
      key: 'desc',
      width: 350,
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
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
            onClick={() => setIsModalAuthor(true)}
          >
            Thêm
          </Button>
          <Input
            placeholder="Tìm tác giả"
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
      <Modal
        title="Thêm tác giả mới"
        open={isModalAuthor}
        onOk={handleOkModalAuthor}
        onCancel={() => setIsModalAuthor(false)}
      >
        <Form form={formAuthor} layout="vertical">
          <Form.Item
            label="Tên tác giả"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên tác giả!' }]}
          >
            <Input placeholder="Nhập tên tác giả" />
          </Form.Item>
          <Form.Item
            label="Ngày sinh"
            name="birthDate"
            rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              style={{ width: '100%' }}
              size="large"
              placeholder="Chọn ngày sinh"
              disabledDate={(current) =>
                current && current > dayjs().endOf('day')
              }
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="desc"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AuthorManagerPage;
