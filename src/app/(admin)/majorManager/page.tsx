'use client';
import React, { useState } from 'react';
import { Table, Button, Space, Input, Popover, Modal, Form } from 'antd';
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
import { MajorModel } from '@/models/majorModel';
import { toast } from 'react-toastify';

const MajorManagerPage = () => {
  const router = useRouter();
  const navigateToPage = (path: string) => {
    router.push(path);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [formMajor] = useForm<MajorModel>();
  const [isModalMajor, setIsModalMajor] = useState(false);

  // Fetch majors data from API
  const { data: majors, refetch: refetchMajors } = useQuery(
    [QueryKey.MAJOR],
    async () => {
      return await adminService.getAllMajor();
    },
  );

  const handleOkModalMajor = async () => {
    try {
      const values = await formMajor.validateFields(['name', 'desc']);
      const data: MajorModel = {
        name: values.name,
        desc: values.desc,
        status: 'ACTIVE',
      };
      await adminService.createMajor(data);
      toast.success('Thêm chuyên ngành thành công!');
      formMajor.resetFields();
      refetchMajors();
      setIsModalMajor(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };
  // Filter data based on search term
  const filteredData = (majors || []).filter((major: any) =>
    major.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Options menu for actions
  const optionsMenu = (
    <div className="flex flex-col space-y-2">
      <Button type="text" onClick={() => alert('Sửa chuyên ngành')}>
        Sửa
      </Button>
      <Button type="text" onClick={() => alert('Xóa chuyên ngành')}>
        Xóa
      </Button>
    </div>
  );

  // Define columns for the table
  const columns = [
    {
      title: 'Tên chuyên ngành',
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
        <p className="text-3xl font-bold">Quản lý chuyên ngành</p>
        <div className="flex items-center space-x-2">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
            onClick={() => setIsModalMajor(true)}
          >
            Thêm
          </Button>
          <Input
            placeholder="Tìm chuyên ngành"
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
        title="Thêm chuyên ngành mới"
        open={isModalMajor}
        onOk={handleOkModalMajor}
        onCancel={() => setIsModalMajor(false)}
      >
        <Form form={formMajor} layout="vertical">
          <Form.Item
            label="Tên chuyên ngành"
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên chuyên ngành!',
              },
            ]}
          >
            <Input placeholder="Nhập tên chuyên ngành" />
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

export default MajorManagerPage;
