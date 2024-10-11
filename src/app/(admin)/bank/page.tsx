'use client';
import { BankConfig } from '@/models/bankConfigModel';
import { adminService } from '@/services/adminService';
import { QueryKey } from '@/types/api';
import { Form, Input, Button, Select, Image } from 'antd';
import { Table } from 'antd';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const BankPage = () => {
  const [form] = Form.useForm<BankConfig>();

  const onFinish = async (values: BankConfig) => {
    values.bankName = banks?.data.find(
      (bank: any) => bank.bin === values.bankId,
    ).name;

    try {
      await adminService.configBankAccount(values);
      form.resetFields();
      toast.success('Cấu hình tài khoản ngân hàng thành công!');
      refetch();
    } catch (err) {
      console.error('Lỗi khi gọi API:', err);
      toast.error('Cấu hình tài khoản ngân hàng thất bại!');
    }
  };

  const columns = [
    {
      title: 'Tên ngân hàng',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
    },
    {
      title: 'Tên chủ tài khoản',
      dataIndex: 'accountName',
      key: 'accountName',
    },
  ];

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

  const {
    data,
    isLoading: isLoadingData,
    refetch,
  } = useQuery([QueryKey.BANK_ACCOUNT], async () => {
    try {
      const response = await adminService.getConfigBankAccount();
      return response.data;
    } catch (err) {
      console.error('Lỗi khi gọi API:', err);
      throw err;
    }
  });

  return (
    <div className="container mx-auto rounded-lg bg-white shadow-lg md:m-5 md:p-8">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Cấu hình tài khoản ngân hàng
      </h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Mã ngân hàng (Bank ID)" name="bankId">
          <Select
            options={bankOptions}
            placeholder="Vui lòng chọn ngân hàng"
            className="rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>

        <Form.Item
          label="Số tài khoản"
          name="accountNumber"
          rules={[{ required: true, message: 'Vui lòng nhập số tài khoản!' }]}
        >
          <Input
            placeholder="Nhập số tài khoản"
            className="rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>

        <Form.Item
          label="Tên chủ tài khoản"
          name="accountName"
          rules={[
            { required: true, message: 'Vui lòng nhập tên chủ tài khoản!' },
          ]}
        >
          <Input
            placeholder="Nhập tên chủ tài khoản"
            className="rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>

        <Form.Item className="flex items-end justify-end">
          <Button
            type="primary"
            htmlType="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
          >
            Lưu
          </Button>
        </Form.Item>
      </Form>
      <Table
        className="mt-6 table w-full"
        columns={columns}
        dataSource={data || []}
        loading={isLoadingData}
        rowKey="bankId"
      />
    </div>
  );
};

export default BankPage;
