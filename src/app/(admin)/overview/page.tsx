'use client';
import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
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
import { Radio } from 'antd';
import { OverviewType } from '@/constants/overviewType';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { QueryKey } from '@/types/api';
import { overviewService } from '@/services/overviewService';
import DateRangePicker from '@/components/DateRangePicker';
import { DATE_FORMAT_DDMMYYYY } from '@/ultils/dateUtils';

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

  const { data: transactionOverview, refetch: refetchTransaction } = useQuery(
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

  const { data: revenueOverTime, refetch: refetchRevenue } = useQuery(
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

  const { data: topUsers, refetch: refetchTopUser } = useQuery(
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

  const { data: topViewData, refetch: refetchTopView } = useQuery(
    [QueryKey.TOP_VIEW, selectedOverview],
    async () => {
      const response = await overviewService.getTopBooksByViews(
        dateRange[0].format('YYYY-MM-DD'),
        dateRange[1].format('YYYY-MM-DD'),
      );
      return response;
    },
    {
      enabled: selectedOverview === OverviewType.TOP_VIEW,
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
      label: 'Lượt view cao nhất',
      value: OverviewType.TOP_VIEW,
    },
    {
      label: 'Tỷ lệ người dùng nạp tiền',
      value: OverviewType.USER_DEPOSIT_RATE,
    },
  ];

  const handleDateChange = (dates: any) => {
    setDateRange(dates);
  };

  useEffect(() => {
    if (selectedOverview === OverviewType.TRANSACTION) {
      refetchTransaction();
    }
    if (selectedOverview === OverviewType.REVENUE) {
      refetchRevenue();
    }
    if (selectedOverview === OverviewType.TOP_USERS) {
      refetchTopUser();
    }
    if (selectedOverview === OverviewType.TOP_VIEW) {
      refetchTopView();
    }
  }, [selectedOverview, dateRange]);

  return (
    <div className="container mx-auto rounded-md bg-white p-5 px-4">
      <h1 className="mb-5 text-center text-2xl font-bold">
        Thống kê Thư viện Online
      </h1>

      <Radio.Group
        className="mb-5 flex justify-center"
        options={options}
        defaultValue={OverviewType.TRANSACTION}
        onChange={(e) => setSelectedOverview(e.target.value)}
        optionType="button"
      />
      {selectedOverview !== OverviewType.USER_DEPOSIT_RATE && (
        <div className="mb-4 mt-4 w-full max-w-md md:w-1/3">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Chọn khoảng thời gian
          </label>
          <DateRangePicker
            allowClear
            format={DATE_FORMAT_DDMMYYYY}
            value={[dayjs(dateRange[0]), dayjs(dateRange[1])]}
            onChange={(date) => {
              handleDateChange(date);
            }}
          />
        </div>
      )}

      {/* Các biểu đồ */}
      <div className="h-screen">
        {selectedOverview === OverviewType.TRANSACTION && (
          <div className="chart-container">
            <h2 className="mb-3 text-center text-xl font-semibold">
              Giao dịch Nạp tiền
            </h2>
            {transactionOverview &&
            transactionOverview.datasets[0].data.reduce(
              (a: number, b: number) => a + b,
              0,
            ) > 0 ? (
              <div className="h-96 w-96">
                <Pie data={transactionOverview} />
              </div>
            ) : (
              <div>
                <span className="text-center font-medium italic text-gray-500">
                  Không có dữ liệu
                </span>
              </div>
            )}
          </div>
        )}

        {selectedOverview === OverviewType.REVENUE && (
          <div className="chart-container">
            <h2 className="mb-3 text-center text-xl font-semibold">
              Doanh thu Theo Thời gian
            </h2>
            {revenueOverTime &&
            revenueOverTime.datasets[0].data.reduce(
              (a: number, b: number) => a + b,
              0,
            ) > 0 ? (
              <div className="h-96 w-full">
                <Bar data={revenueOverTime} />
              </div>
            ) : (
              <div>
                <span className="text-center font-medium italic text-gray-500">
                  Không có dữ liệu
                </span>
              </div>
            )}
          </div>
        )}

        {selectedOverview === OverviewType.TOP_USERS && (
          <div className="chart-container">
            <h2 className="mb-3 text-center text-xl font-semibold">
              Top người dùng theo thời gian
            </h2>
            {topUsers &&
            topUsers.datasets[0].data.reduce(
              (a: number, b: number) => a + b,
              0,
            ) > 0 ? (
              <div className="h-96 w-96">
                <Bar data={topUsers} />
              </div>
            ) : (
              <div>
                <span className="text-center font-medium italic text-gray-500">
                  Không có dữ liệu
                </span>
              </div>
            )}
          </div>
        )}

        {selectedOverview === OverviewType.TOP_VIEW && (
          <div className="chart-container">
            <h2 className="mb-3 text-center text-xl font-semibold">
              Sách có lượt view cao theo khoảng thời gian
            </h2>
            {topViewData &&
            topViewData.datasets[0].data.reduce(
              (a: number, b: number) => a + b,
              0,
            ) > 0 ? (
              <div className="h-96 w-96">
                <Bar data={topViewData} />
              </div>
            ) : (
              <div>
                <span className="text-center font-medium italic text-gray-500">
                  Không có dữ liệu
                </span>
              </div>
            )}
          </div>
        )}

        {selectedOverview === OverviewType.USER_DEPOSIT_RATE && (
          <div className="chart-container">
            <h2 className="mb-3 text-center text-xl font-semibold">
              Tỷ lệ người dùng nạp tiền
            </h2>
            {userDepositRate &&
            userDepositRate.datasets[0].data.reduce(
              (a: number, b: number) => a + b,
              0,
            ) > 0 ? (
              <div className="h-96 w-96">
                <Pie data={userDepositRate} />
              </div>
            ) : (
              <div>
                <span className="text-center font-medium italic text-gray-500">
                  Không có dữ liệu
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewPage;
