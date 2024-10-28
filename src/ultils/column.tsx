// src/config/columnsConfig.tsx
import React from 'react';
import dayjs from 'dayjs';
import { Badge } from 'antd';
import { formatCurrencyVND } from './number';

export const revenueTableColumns = [
  {
    title: 'Người yêu cầu',
    dataIndex: 'userId',
    key: 'userId',
    render: (user: { userName: string; studentCode: number }) => (
      <p>{`${user.userName} - ${user.studentCode}`}</p>
    ),
  },
  {
    title: 'Số tiền',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount: number) => <p>{formatCurrencyVND(amount || 0)}</p>,
  },
  {
    title: 'Ngày yêu cầu',
    dataIndex: 'date',
    key: 'date',
    render: (date: string) => <p>{dayjs(date).format('DD/MM/YYYY')}</p>,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Badge
        color={status === 'APPROVED' ? 'green' : 'orange'}
        text={status === 'APPROVED' ? 'Đã duyệt' : 'Chờ duyệt'}
      />
    ),
  },
];

export const topUserTableColumns = [
  {
    title: 'STT',
    key: 'stt',
    render: (_: any, __: any, index: number) => <p>{index + 1}</p>,
  },
  {
    title: 'Tên người dùng',
    dataIndex: 'userName',
    key: 'userName',
    render: (userName: string, record: { userId: string }) => (
      <p>{`${userName} - ${record.userId}`}</p>
    ),
  },
  {
    title: 'Tổng số tiền',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    render: (totalAmount: number) => (
      <p>{formatCurrencyVND(totalAmount || 0)}</p>
    ),
  },
];

export const topViewTableColumns = [
  {
    title: 'STT',
    key: 'stt',
    render: (_: any, __: any, index: number) => <p>{index + 1}</p>,
  },
  {
    title: 'Tiêu đề sách',
    dataIndex: 'title',
    key: 'title',
    render: (title: string) => <p>{title}</p>,
  },
  {
    title: 'Tổng lượt xem',
    dataIndex: 'totalViews',
    key: 'totalViews',
    render: (totalViews: number) => <p>{totalViews}</p>,
  },
];
