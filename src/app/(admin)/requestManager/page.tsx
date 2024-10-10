'use client';
import { UserModel } from '@/models';
import { BankConfig } from '@/models/bankConfigModel';
import { Request } from '@/models/requestModel';
import { userInfo } from '@/models/userInfo';
import { adminService } from '@/services/adminService';
import { QueryKey } from '@/types/api';
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
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
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
    {
      title: 'Status',
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
                  const storedUserInfo = localStorage.getItem('userInfo');
                  const userInfo: userInfo = storedUserInfo
                    ? JSON.parse(storedUserInfo)
                    : null;
                  const userId = userInfo?.userRaw?._id;
                  handleAcceptRequest(userId, String(record._id));
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
  const { data, isLoading } = useQuery(
    [QueryKey.REQUEST],
    adminService.getAllRequest,
    {},
  );

  const handleAcceptRequest = async (userId: string, requestId: string) => {
    try {
      await adminService.acceptRequest({ userId, requestId });
      toast.success('Duyệt yêu cầu thành công!');
    } catch (err) {
      console.error('Lỗi khi gọi API:', err);
      toast.error('Duyệt yêu cầu thất bại!');
    }
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id"
      />
    </div>
  );
};
export default RequestManagerPage;
