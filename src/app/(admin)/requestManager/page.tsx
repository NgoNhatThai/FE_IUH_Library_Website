'use client';
import { UserModel } from '@/models';
import { BankConfig } from '@/models/bankConfigModel';
import { Request } from '@/models/requestModel';
import { adminService } from '@/services/adminService';
import { QueryKey } from '@/types/api';
import { formatCurrencyVND } from '@/ultils/number';
import { Badge, Button, Table } from 'antd';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const RequestManagerPage = () => {
  const columns = [
    {
      title: 'Người yêu cầu',
      dataIndex: 'userId',
      key: 'userId',
      render: (user: UserModel) => {
        return <p>{`${user?.userName || ''} - ${user?.studentCode || ''}`}</p>;
      },
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      className: 'text-right',
      key: 'amount',
      render: (amount: number) => {
        return <p>{formatCurrencyVND(amount || 0)}</p>;
      },
    },
    {
      title: 'Tài khoản nhận',
      dataIndex: 'bankConfigId',
      key: 'bankConfigId',
      render: (bankConfig: BankConfig) => {
        return (
          <p>{`${bankConfig?.bankName || ''} - ${bankConfig?.accountNumber || ''} `}</p>
        );
      },
    },
    // ngày tạo
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt ',
      render: (createdAt: string) => {
        return <p>{new Date(createdAt).toLocaleDateString()}</p>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Request) => {
        return (
          <div className="flex items-center">
            {status === 'PENDING' ? (
              <Button
                title="Duyệt"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => {
                  handleAcceptRequest(
                    String(record?.userId?._id),
                    String(record._id),
                  );
                }}
              >
                Duyệt
              </Button>
            ) : (
              <Badge count="Đã duyệt" color="green" />
            )}
          </div>
        );
      },
    },
  ];
  const { data, isLoading, refetch } = useQuery(
    [QueryKey.REQUEST],
    adminService.getAllRequest,
    {},
  );
  console.log('data', data);
  const handleAcceptRequest = async (userId: string, requestId: string) => {
    try {
      const response = await adminService.acceptRequest({ userId, requestId });
      console.log('Duyệt yêu cầu thành công:', response);
      toast.success('Duyệt yêu cầu thành công!');
      refetch();
    } catch (err) {
      console.error('Lỗi khi gọi API:', err);
      toast.error('Duyệt yêu cầu thất bại!');
    }
  };
  return (
    <div className="container rounded-md bg-white">
      <h1 className="mb-4 text-center text-2xl font-bold">Yêu cầu nạp tiền</h1>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id"
        // pagination={{
        //   pageSize: 5,
        //   showSizeChanger: true,
        //   pageSizeOptions: ['5', '10', '20', '30'],
        // }}
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
export default RequestManagerPage;
