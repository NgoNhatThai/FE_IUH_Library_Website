'use client';
import React, { useState } from 'react';
import { Table, Button, Image, Space, Input, Popover, Modal, Form } from 'antd';
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
import TextArea from 'antd/es/input/TextArea';
import { useForm } from 'antd/es/form/Form';
import { CategoryModel, CategoryStatus } from '@/models';
import { toast } from 'react-toastify';

const CategoryManagerPage = () => {
  const router = useRouter();
  const [isModalCatergory, setIsModalCatergor] = useState(false);

  const navigateToPage = (path: string) => {
    router.push(path);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [formCategory] = useForm<CategoryModel>();

  const { data: categories, refetch: refetchCategories } = useQuery(
    [QueryKey.CATEGORY],
    async (): Promise<
      {
        name: string;
        desc: string;
        image: string;
        status: string;
        createdAt: string;
        _id: string;
      }[]
    > => {
      return await adminService.getAllCategory();
    },
  );
  const handleOkModalCategory = async () => {
    try {
      const values = await formCategory.validateFields(['name', 'desc']);
      const data: CategoryModel = {
        name: values.name,
        desc: values.desc,
        status: CategoryStatus.ACTIVE,
      };
      await adminService.createCategory(data);
      toast.success('Thêm danh mục thành công!');
      formCategory.resetFields();
      refetchCategories();
      setIsModalCatergor(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };
  const filteredData = (categories || []).filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const optionsMenu = (
    <div className="flex flex-col space-y-2">
      <Button type="text" onClick={() => alert('Sửa danh mục')}>
        Sửa
      </Button>
      <Button type="text" onClick={() => alert('Xóa danh mục')}>
        Xóa
      </Button>
    </div>
  );

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <Image width={50} src={image} alt="category image" />
      ),
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span className="font-semibold">{name}</span>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'desc',
      key: 'desc',
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
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => dayjs(createdAt).format('DD-MM-YYYY'),
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
        <p className="text-3xl font-bold">Quản lý danh mục</p>
        <div className="flex items-center space-x-2">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
            onClick={() => setIsModalCatergor(true)}
          >
            Thêm
          </Button>
          <Input
            placeholder="Tìm danh mục"
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
        title="Thêm danh mục mới"
        open={isModalCatergory}
        onOk={handleOkModalCategory}
        onCancel={() => setIsModalCatergor(false)}
      >
        <Form form={formCategory} layout="vertical">
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
          >
            <Input placeholder="Nhập tên danh mục" />
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

export default CategoryManagerPage;
