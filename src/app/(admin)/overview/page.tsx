'use client';
import React, { useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radio, DatePicker } from 'antd';
import { OverviewType } from '@/constants/overviewType';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { QueryKey } from '@/types/api';
import { overviewService } from '@/services/overviewService';

// Đăng ký các thành phần biểu đồ
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
);

const OverviewPage = () => {
  const [selectedOverview, setSelectedOverview] = useState(
    OverviewType.TRANSACTION,
  );

  const [dateRange, setDateRange] = useState([
    dayjs().subtract(7, 'day'),
    dayjs(),
  ]);

  const { data: transactionOverview } = useQuery(
    [QueryKey.TRANSACTION_OVERVIEW, selectedOverview],
    async () => {
      const response = await overviewService.getTransactionOverview(
        dateRange[0].format('YYYY-MM-DD'),
        dateRange[1].format('YYYY-MM-DD'),
      );
      return response;
    },
    {
      enabled: selectedOverview === OverviewType.TRANSACTION,
    },
  );

  const { data: revenueOverTime } = useQuery(
    [QueryKey.REVENUE_OVER_TIME, selectedOverview],
    async () => {
      const response = await overviewService.getRevenueOverTime(
        dateRange[0].format('YYYY-MM-DD'),
        dateRange[1].format('YYYY-MM-DD'),
      );
      return response;
    },
    {
      enabled: selectedOverview === OverviewType.REVENUE,
    },
  );

  const { data: topUsers } = useQuery(
    [QueryKey.TOP_USERS, selectedOverview],
    async () => {
      const response = await overviewService.getTopUsersByDepositAmount(
        dateRange[0].format('YYYY-MM-DD'),
        dateRange[1].format('YYYY-MM-DD'),
      );
      return response;
    },
    {
      enabled: selectedOverview === OverviewType.TOP_USERS,
    },
  );

  const { data: averageProcessingTime } = useQuery(
    [QueryKey.AVERAGE_PROCESSING_TIME, selectedOverview],
    async () => {
      const response = await overviewService.getAverageProcessingTime(
        dateRange[0].format('YYYY-MM-DD'),
        dateRange[1].format('YYYY-MM-DD'),
      );
      return response;
    },
    {
      enabled: selectedOverview === OverviewType.AVERAGE_PROCESSING_TIME,
    },
  );

  const { data: userDepositRate } = useQuery(
    [QueryKey.USER_DEPOSIT_RATE, selectedOverview],
    async () => {
      const response = await overviewService.getUserDepositRate();
      return response;
    },
    {
      enabled: selectedOverview === OverviewType.USER_DEPOSIT_RATE,
    },
  );

  const options = [
    {
      label: 'Giao dịch nạp tiền',
      value: OverviewType.TRANSACTION,
    },
    {
      label: 'Doanh thu',
      value: OverviewType.REVENUE,
    },
    {
      label: 'Người dùng hàng đầu',
      value: OverviewType.TOP_USERS,
    },
    {
      label: 'Thời gian xử lý trung bình',
      value: OverviewType.AVERAGE_PROCESSING_TIME,
    },
    {
      label: 'Tỷ lệ người dùng nạp tiền',
      value: OverviewType.USER_DEPOSIT_RATE,
    },
  ];

  const handleDateChange = (dates: any) => {
    setDateRange(dates);
    // Ở đây bạn có thể gọi API để lấy dữ liệu theo ngày đã chọn
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="mb-5 text-center text-2xl font-bold">
        Thống kê Thư viện Online
      </h1>

      <DatePicker.RangePicker
        className="mb-5"
        onChange={handleDateChange}
        format="DD/MM/YYYY"
      />

      <Radio.Group
        className="mb-5 flex justify-center"
        options={options}
        defaultValue={OverviewType.TRANSACTION}
        onChange={(e) => setSelectedOverview(e.target.value)}
        optionType="button"
      />

      <div className="">
        {selectedOverview === OverviewType.TRANSACTION && (
          <div className="chart-container">
            <h2 className="mb-3 text-center text-xl font-semibold">
              Giao dịch Nạp tiền
            </h2>
            {transactionOverview && <Pie data={transactionOverview} />}{' '}
            {/* Chỉnh sửa thành Pie chart */}
          </div>
        )}

        {selectedOverview === OverviewType.REVENUE && (
          <div className="chart-container">
            <h2 className="mb-3 text-center text-xl font-semibold">
              Doanh thu Theo Thời gian
            </h2>
            {revenueOverTime && <Line data={revenueOverTime} />}{' '}
            {/* Line chart */}
          </div>
        )}

        {selectedOverview === OverviewType.TOP_USERS && (
          <div className="chart-container">
            <h2 className="mb-3 text-center text-xl font-semibold">
              Người dùng hàng đầu
            </h2>
            {topUsers && <Bar data={topUsers} />}{' '}
            {/* Chỉnh sửa thành Bar chart */}
          </div>
        )}

        {selectedOverview === OverviewType.AVERAGE_PROCESSING_TIME && (
          <div className="chart-container">
            <h2 className="mb-3 text-center text-xl font-semibold">
              Thời gian xử lý trung bình
            </h2>
            {averageProcessingTime && <Line data={averageProcessingTime} />}{' '}
            {/* Line chart */}
          </div>
        )}

        {selectedOverview === OverviewType.USER_DEPOSIT_RATE && (
          <div className="chart-container">
            <h2 className="mb-3 text-center text-xl font-semibold">
              Tỷ lệ người dùng nạp tiền
            </h2>
            {userDepositRate && <Pie data={userDepositRate} />}{' '}
            {/* Chỉnh sửa thành Pie chart */}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewPage;
