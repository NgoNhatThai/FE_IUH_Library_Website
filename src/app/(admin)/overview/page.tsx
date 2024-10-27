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
import { Radio, Select } from 'antd';
import { OverviewType } from '@/constants/overviewType';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { QueryKey } from '@/types/api';
import { overviewService } from '@/services/overviewService';
import DateRangePicker from '@/components/DateRangePicker';
import { DATE_FORMAT_DDMMYYYY } from '@/ultils/dateUtils';
import ButtonExport from '@/components/Button/ButtonExport';
import * as XLSX from 'xlsx';
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
    OverviewType.REVENUE,
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
      enabled: selectedOverview === OverviewType.REVENUE,
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
  console.log('topUsers', topUsers);
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
    // {
    //   label: 'Giao dịch nạp tiền',
    //   value: OverviewType.TRANSACTION,
    // },
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
    // if (selectedOverview === OverviewType.TRANSACTION) {
    //   refetchTransaction();
    // }
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

  const handleExportTopUsers = () => {
    if (!topUsers?.tableData || topUsers.tableData.length === 0) return;

    const startDate = dateRange[0].format('DD-MM-YYYY');
    const endDate = dateRange[1].format('DD-MM-YYYY');
    const fileName = `TopNguoiDung_${startDate}_${endDate}.xlsx`;

    const data = topUsers.tableData.map((user: any, index: any) => ({
      STT: index + 1,
      'Tên người dùng': user.userName,
      'Số tiền nạp': user.totalAmount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Top Users');

    XLSX.writeFile(workbook, fileName);
  };
  const handleExportTopView = () => {
    if (!topViewData?.tableData || topViewData.tableData.length === 0) return;

    const startDate = dateRange[0].format('DD-MM-YYYY');
    const endDate = dateRange[1].format('DD-MM-YYYY');
    const fileName = `TopSach_${startDate}_${endDate}.xlsx`;

    const data = topViewData.tableData.map((book: any, index: any) => ({
      STT: index + 1,
      'Tên sách': book.title,
      'Tổng lượt đọc': book.totalViews,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Top Books');

    XLSX.writeFile(workbook, fileName);
  };
  const handleExportRevenue = () => {
    if (!revenueOverTime?.tableData || revenueOverTime.tableData.length === 0)
      return;

    const startDate = dateRange[0].format('DD-MM-YYYY');
    const endDate = dateRange[1].format('DD-MM-YYYY');
    const fileName = `DoanhThu_${startDate}_${endDate}.xlsx`;

    const data = revenueOverTime.tableData.map((entry: any, index: any) => ({
      STT: index + 1,
      'Tên người nạp': entry.userId.userName,
      'Số tiền nạp': entry.amount,
      'Ngày nạp': dayjs(entry.date).format('DD-MM-YYYY'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Revenue');

    XLSX.writeFile(workbook, fileName);
  };
  return (
    <div className="container mx-auto rounded-md bg-white p-5 px-4">
      <h1 className="mb-5 text-center text-2xl font-bold">
        Thống kê Thư viện Online
      </h1>

      <Radio.Group
        className="mb-5 flex justify-center space-x-2"
        options={options}
        defaultValue={OverviewType.REVENUE}
        onChange={(e) => setSelectedOverview(e.target.value)}
        optionType="button"
        buttonStyle="solid"
      />

      {selectedOverview !== OverviewType.USER_DEPOSIT_RATE && (
        <div className="mb-4 mt-4 flex w-full max-w-md items-end space-x-4">
          <div className="w-3/4">
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

          {selectedOverview === OverviewType.TOP_USERS ||
          selectedOverview === OverviewType.TOP_VIEW ? (
            <div className="w-1/4 items-end">
              <Select
                defaultValue={5}
                // onChange={handleTopLimitChange}
                options={[
                  { value: 5, label: 'Top 5' },
                  { value: 10, label: 'Top 10' },
                ]}
                className="h-9 w-full"
              />
            </div>
          ) : null}
        </div>
      )}

      {/* Các biểu đồ */}
      <div className="h-screen">
        {/* {selectedOverview === OverviewType.TRANSACTION && (
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
        )} */}

        {selectedOverview === OverviewType.REVENUE && (
          <>
            <h2 className="mb-3 text-center text-xl font-semibold">
              Doanh thu Theo Thời gian
            </h2>
            {revenueOverTime &&
            revenueOverTime.datasets[0].data.reduce(
              (a: number, b: number) => a + b,
              0,
            ) > 0 ? (
              <div className="chart-table-container flex">
                <div className="chart-container w-1/2">
                  <div className="h-96 w-5/6">
                    <Bar data={revenueOverTime} />
                  </div>
                </div>

                <div className="table-container w-1/2">
                  <div className="mb-2 flex justify-end">
                    <ButtonExport onClick={handleExportRevenue} />
                  </div>

                  <table className="min-w-full rounded-lg border border-gray-300 bg-white shadow-md">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="border px-4 py-2">STT</th>
                        <th className="border px-4 py-2">Tên người nạp</th>
                        <th className="border px-4 py-2">Số tiền nạp</th>
                        <th className="border px-4 py-2">Ngày nạp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenueOverTime?.tableData.map(
                        (entry: any, index: any) => (
                          <tr
                            key={entry._id}
                            className="text-center hover:bg-gray-100"
                          >
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">
                              {entry.userId.userName}
                            </td>
                            <td className="border px-4 py-2">
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              }).format(entry.amount)}
                            </td>
                            <td className="border px-4 py-2">
                              {dayjs(entry.date).format('DD-MM-YYYY')}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex h-96 items-center justify-center">
                <span className="text-center font-medium italic text-gray-500">
                  Không có dữ liệu
                </span>
              </div>
            )}
          </>
        )}

        {selectedOverview === OverviewType.TOP_USERS && (
          <>
            {' '}
            <h2 className="mb-3 text-center text-xl font-semibold">
              Top người dùng theo thời gian
            </h2>{' '}
            {topUsers &&
            topUsers.datasets[0].data.reduce((a: any, b: any) => a + b, 0) >
              0 ? (
              <div className="chart-table-container flex">
                <div className="chart-container w-1/2">
                  <div className="h-96 w-5/6">
                    <Bar data={topUsers} />
                  </div>
                </div>

                <div className="table-container w-1/2">
                  <div className="mb-2 flex justify-end">
                    <ButtonExport onClick={handleExportTopUsers} />
                  </div>

                  <table className="min-w-full rounded-lg border border-gray-300 bg-white shadow-md">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="border px-4 py-2">STT</th>
                        <th className="border px-4 py-2">Tên người dùng</th>
                        <th className="border px-4 py-2">Số tiền nạp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topUsers?.tableData
                        .sort((a: any, b: any) => b.totalAmount - a.totalAmount)
                        .map((user: any, index: any) => (
                          <tr
                            key={user.userId}
                            className="text-center hover:bg-gray-100"
                          >
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">
                              {user.userName}
                            </td>
                            <td className="border px-4 py-2">
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              }).format(user.totalAmount)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex h-96 items-center justify-center">
                <span className="text-center font-medium italic text-gray-500">
                  Không có dữ liệu
                </span>
              </div>
            )}
          </>
        )}

        {selectedOverview === OverviewType.TOP_VIEW && (
          <>
            <h2 className="mb-3 text-center text-xl font-semibold">
              Sách có lượt view cao theo khoảng thời gian
            </h2>
            {topViewData &&
            topViewData.datasets[0].data.reduce((a: any, b: any) => a + b, 0) >
              0 ? (
              <div className="chart-table-container flex">
                <div className="chart-container w-2/3">
                  <div className="h-96 w-11/12">
                    <Bar data={topViewData} />
                  </div>
                </div>

                <div className="table-container w-1/3">
                  <div className="mb-2 flex justify-end">
                    <ButtonExport onClick={handleExportTopView} />
                  </div>

                  <table className="min-w-full rounded-lg border border-gray-300 bg-white shadow-md">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="border px-4 py-2">STT</th>
                        <th className="border px-4 py-2">Tên sách</th>
                        <th className="border px-4 py-2">Tổng lượt đọc</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topViewData?.tableData.map((book: any, index: any) => (
                        <tr
                          key={book.bookId}
                          className="text-center hover:bg-gray-100"
                        >
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{book?.title}</td>
                          <td className="border px-4 py-2">
                            {book?.totalViews}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex h-96 items-center justify-center">
                <span className="text-center font-medium italic text-gray-500">
                  Không có dữ liệu
                </span>
              </div>
            )}
          </>
        )}

        {selectedOverview === OverviewType.USER_DEPOSIT_RATE && (
          <div className="chart-container" style={{ height: '500px' }}>
            <h2 className="mb-10 text-center text-xl font-semibold">
              Tỷ lệ người dùng nạp tiền
            </h2>
            {userDepositRate &&
            userDepositRate.datasets[0].data.reduce(
              (a: number, b: number) => a + b,
              0,
            ) > 0 ? (
              <div className="mx-auto h-96 w-96">
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
