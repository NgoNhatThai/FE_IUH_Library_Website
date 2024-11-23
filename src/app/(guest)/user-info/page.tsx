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
  Radio,
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

const { Title } = Typography;

const UserInfoPage = () => {
  const [open, setOpen] = useState(false);
  const [isFirstTable, setIsFirstTable] = useState(true);
  const [openQR, setOpenQR] = useState(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState<any>();
  const [amount, setAmount] = useState<number>(0);
  const storedUserInfo = localStorage.getItem('userInfo');
  const userInfo: userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  const userId = userInfo?.userRaw?._id;
  const userCode = userInfo?.userRaw?.studentCode;

  const options = [
    {
      label: 'Lịch sử giao dịch',
      value: true,
    },
    {
      label: 'Yêu cầu đang chờ',
      value: false,
    },
  ];

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
  const { data: pendingRequest, refetch: refetchPendingRequest } = useQuery(
    [QueryKey.REQUEST],
    async () => {
      const response = await userService.getPendingRequest(userId);
      return response;
    },
    { enabled: userId ? true : false },
  );

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

  const addRequestAmount = async () => {
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

  const handleCancelRequest = async (userId: string, requestId: string) => {
    try {
      const response = await userService.deletePendingRequest({
        userId,
        requestId,
      });
      if (response) {
        toast.success('Hủy yêu cầu thành công!');
        refetchPendingRequest();
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
      render: (amount: number) => {
        return (
          <p
            className={`${amount > 0 ? `text-green-600` : `text-red-600`} font-bold`}
          >
            {formatCurrencyVND(amount || 0)}
          </p>
        );
      },
    },
    {
      title: 'Thời gian',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  const pendingTableColumns = [
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => {
        return (
          <p
            className={`${amount > 0 ? `text-green-600` : `text-red-600`} font-bold`}
          >
            {formatCurrencyVND(amount || 0)}
          </p>
        );
      },
    },
    {
      title: 'Tài khoản nhận',
      dataIndex: 'bankConfigId',
      key: 'bankConfigId',
      render: (bankConfig: any) => {
        return (
          <p>{`${bankConfig?.bankName || ''} - ${bankConfig?.accountNumber || ''} `}</p>
        );
      },
    },
    {
      title: 'Thời gian',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Tùy chỉnh',
      dataIndex: 'status',
      key: 'status',
      render: (__status: string, record: any) => {
        return (
          <div className="flex items-center">
            <Button
              title="Hủy"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={() => {
                handleCancelRequest(userId, record._id);
              }}
            >
              Hủy
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto mt-10 md:mb-20">
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

              <Form.Item className="flex justify-between">
                <Button type="primary" htmlType="submit">
                  Đổi mật khẩu
                </Button>
                <Button
                  type="link"
                  color="danger"
                  htmlType="submit"
                  onClick={() => {
                    alert(
                      'Liên hệ quản trị viên qua số điện thoại: 0928292929 hoặc email: sv4tb1@gmail.com',
                    );
                  }}
                >
                  Báo lỗi thông tin
                </Button>
              </Form.Item>
            </Form>
          </Col>

          {!open ? (
            <Col span={12} className="flex flex-col">
              <span className="text-lg font-bold text-gray-700">
                Số dư tài khoản: {formatCurrencyVND(userAmount?.total || 0)}
              </span>

              <Radio.Group
                className="mt-4"
                options={options}
                defaultValue={true}
                onChange={(e) => {
                  setIsFirstTable(e.target.value);
                }}
                optionType="button"
              />
              {isFirstTable ? (
                <>
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
                </>
              ) : (
                <>
                  <Table
                    columns={pendingTableColumns}
                    dataSource={pendingRequest}
                    pagination={false}
                    className="mt-4"
                    scroll={{ y: 240 }}
                  />
                </>
              )}
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
                  if (amount === 0) {
                    toast.error('Vui lòng nhập số tiền cần nạp!');
                    return;
                  }
                  if (!selectedBankAccount) {
                    toast.error('Vui lòng chọn tài khoản nhận!');
                    return;
                  }
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
        userId={String(userCode)}
        handleFinish={addRequestAmount}
      />
    </div>
  );
};

export default UserInfoPage;
