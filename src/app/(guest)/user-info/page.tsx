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
import { QRModal } from '@/components/QRModal';
import { toast } from 'react-toastify';

const { Title, Text } = Typography;

const UserInfoPage = () => {
  const [open, setOpen] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState<any>();
  const [amount, setAmount] = useState<number>(0);
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

  const { data: bankAccounts } = useQuery([QueryKey.BANK_ACCOUNT], async () => {
    const response = await adminService.getConfigBankAccount();
    return response;
  });

  const bankOptions = useMemo(
    () =>
      bankAccounts?.data.map((account: any) => ({
        label: (
          <div
            key={account.id}
            className="flex flex-col justify-start space-y-1"
          >
            <span className="text-sm text-sky-500">{`${account.bankName}`}</span>
            <span className="text-sm font-medium">{`STK: ${account.accountNumber} - ${account.accountName}`}</span>
          </div>
        ),
        value: account._id,
      })),
    [bankAccounts],
  );

  const onFinish = (values: UserModel) => {
    console.log('Received values:', values);
  };

  const handleTopUp = () => {
    setOpen(!open);
  };

  const handleFinish = async () => {
    try {
      if (amount === 0) {
        toast.error('Vui lòng nhập số tiền cần nạp!');
        return;
      }
      if (!selectedBankAccount) {
        toast.error('Vui lòng chọn tài khoản nhận!');
        return;
      }
      const response = await userService.topUpAccount({
        userId,
        amount,
        bankConfigId: selectedBankAccount._id,
      });
      if (response) {
        toast.success('Gửi yên cầu nạp tiền thành công!');
        setOpenQR(false);
        setOpen(false);
        setAmount(0);
      }
    } catch (error) {
      console.log(error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
    }
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
            <Col span={12} className="flex w-full flex-col space-y-4">
              <div className="w-full text-left">
                <span className="text-gray-700">
                  Chọn tài khoản nhận <span className="text-red-500">*</span>
                </span>
              </div>
              <Select
                options={bankOptions}
                onChange={(value) => {
                  const selected = bankAccounts?.data.find(
                    (account: any) => account._id === value,
                  );
                  setSelectedBankAccount(selected);
                }}
                placeholder="Vui lòng chọn tài khoản nhận"
                className="h-fit w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="w-full text-left">
                <span className="text-gray-700">
                  Nhập số tiền cần nạp <span className="text-red-500">*</span>
                </span>
              </div>
              <InputNumber
                placeholder="Nhập số tiền cần nạp"
                className="w-full"
                onChange={(value) => {
                  setAmount(Number(value) || 0);
                }}
                // formatter={(value) => formatterNumber(value?.toString())}
                // parser={(value) => parserNumber(value)}
                addonAfter="VND"
              />

              <Button
                type="primary"
                onClick={() => {
                  setOpenQR(true);
                }}
                className="w-full"
              >
                Hoàn tất
              </Button>
            </Col>
          )}
        </Row>
      </Card>
      <QRModal
        visibleModal={openQR}
        handleOpenOrCloseQRModal={() => {
          setOpenQR(!openQR);
        }}
        amount={amount}
        bankAccountDetail={{
          bankId: selectedBankAccount?.bankId || '',
          accountNumber: selectedBankAccount?.accountNumber || '',
          accountName: selectedBankAccount?.accountName || '',
          bankName: selectedBankAccount?.bankName || '',
        }}
        userId={userId}
        handleFinish={handleFinish}
      />
    </div>
  );
};

export default UserInfoPage;
