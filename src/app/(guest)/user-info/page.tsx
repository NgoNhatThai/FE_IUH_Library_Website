'use client';
import React, { useMemo, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Avatar,
  Typography,
  Space,
  Card,
  Row,
  Col,
  Table,
  Image,
  Select,
  InputNumber,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { userInfo } from '@/models/userInfo';
import { UserModel } from '@/models';
import { useQuery } from 'react-query';
import { QueryKey } from '@/types/api';
import { userService } from '@/services/userService';
import { formatCurrencyVND } from '@/ultils/numberUtils';
import { adminService } from '@/services/adminService';

const { Title, Text } = Typography;

const UserInfoPage = () => {
  const [open, setOpen] = useState(false);
  const storedUserInfo = localStorage.getItem('userInfo');
  const userInfo: userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  const userId = userInfo?.userRaw?._id;

  const [form] = Form.useForm<UserModel>();

  const { data: userAmount } = useQuery(
    [QueryKey.USER_AMOUNT, userId],
    async () => {
      const response = await userService.getUserAmount(userId);
      return response;
    },
  );
  const { data: user } = useQuery([QueryKey.USER, userId], async () => {
    const response = await userService.getUserInfo(userId);
    form.setFieldsValue(response);
    return response;
  });

  const { data: banks } = useQuery('banks', adminService.getAllBank);

  const bankOptions = useMemo(
    () =>
      banks?.data.map((bank: any) => ({
        label: (
          <div
            key={bank.id}
            className="flex items-center justify-start space-x-2"
          >
            <Image
              preview={false}
              src={bank.logo}
              className="!h-auto !w-[70px] object-cover lg:!w-[90px]"
              alt={bank.name}
            />
            <span className="line-clamp-1 flex-1">{bank.name}</span>
          </div>
        ),
        value: bank.bin,
      })),
    [banks],
  );

  const onFinish = (values: UserModel) => {
    console.log('Received values:', values);
  };

  const handleTopUp = () => {
    setOpen(!open);
  };
  const columns = [
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: any) => formatCurrencyVND(text),
    },
    {
      title: 'Thời gian',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <div className="container mx-auto mt-10">
      <Card className="p-5 shadow-md">
        <Space
          direction="vertical"
          size="middle"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Avatar
            size={100}
            src={user?.avatar}
            icon={<UserOutlined />}
            className="border border-gray-300"
          />
          <Title level={3}>{user?.userName || ''}</Title>
        </Space>

        <Row gutter={16} className="mt-4">
          <Col span={12}>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                userName: user?.userName,
                studentCode: user?.studentCode,
                memberShip: user?.memberShip,
                status: user?.status,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Tên người dùng"
                name="userName"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên người dùng!' },
                ]}
              >
                <Input placeholder="Nhập tên người dùng" readOnly />
              </Form.Item>

              <Form.Item
                label="Mã sinh viên"
                name="studentCode"
                rules={[
                  { required: true, message: 'Vui lòng nhập mã sinh viên!' },
                ]}
              >
                <Input placeholder="Nhập mã sinh viên" readOnly />
              </Form.Item>

              <Form.Item
                label="Thành viên"
                name="memberShip"
                rules={[
                  { required: true, message: 'Vui lòng chọn loại thành viên!' },
                ]}
              >
                <Input placeholder="Nhập loại thành viên" readOnly />
              </Form.Item>

              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[
                  { required: true, message: 'Vui lòng chọn trạng thái!' },
                ]}
              >
                <Input placeholder="Nhập trạng thái" readOnly />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </Col>

          {!open ? (
            <Col span={12} className="flex flex-col">
              <Text className="text-md font-medium">{`Số tiền hiện có: ${formatCurrencyVND(userAmount?.total || 0)}`}</Text>

              <Text className="text-sm">Lịch sử giao dịch</Text>
              <Table
                columns={columns}
                dataSource={userAmount?.history}
                pagination={false}
                className="mt-4"
                scroll={{ y: 240 }}
              />
              <Button type="primary" onClick={handleTopUp} className="mt-4">
                Nạp tiền
              </Button>
            </Col>
          ) : (
            <Col
              span={12}
              className="flex flex-col items-center justify-center"
            >
              <Select
                options={bankOptions}
                placeholder="Vui lòng chọn ngân hàng"
                className="rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputNumber placeholder="Nhập số tiền cần nạp" />
              <Button type="primary" onClick={handleTopUp} className="mt-4">
                Hoàn tất
              </Button>
            </Col>
          )}
        </Row>
      </Card>
    </div>
  );
};

export default UserInfoPage;
