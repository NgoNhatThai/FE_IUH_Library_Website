'use client';
import React, { useEffect, useMemo, useState } from 'react';
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
import { Radio, Select, Table } from 'antd';
import { OverviewType } from '@/constants/overviewType';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { QueryKey } from '@/types/api';
import { overviewService } from '@/services/overviewService';
import DateRangePicker from '@/components/DateRangePicker';
import { DATE_FORMAT_DDMMYYYY } from '@/ultils/dateUtils';
import ButtonExport from '@/components/Button/ButtonExport';
import * as XLSX from 'xlsx';
import {
  revenueTableColumns,
  topUserTableColumns,
  topViewTableColumns,
} from '@/ultils/column';
import AdminHomePage from '../home/page';
import { UserModal } from '@/models/userInfo';
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
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const [selectedOverview, setSelectedOverview] = useState(
    OverviewType.REVENUE,
  );
  const user: UserModal = useMemo(() => {
    return userInfo ? userInfo.userRaw : null;
  }, [userInfo]);
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(7, 'day'),
    dayjs(),
  ]);

  const [limit, setLimit] = useState(5);

  const topOptions = [
    { value: 1, label: 'Top 1' },
    { value: 2, label: 'Top 2' },
    { value: 3, label: 'Top 3' },
    { value: 4, label: 'Top 4' },
    { value: 5, label: 'Top 5' },
    { value: 6, label: 'Top 6' },
    { value: 7, label: 'Top 7' },
    { value: 8, label: 'Top 8' },
    { value: 9, label: 'Top 9' },
    { value: 10, label: 'Top 10' },
  ];

  // const { data: transactionOverview, refetch: refetchTransaction } = useQuery(
  //   [QueryKey.TRANSACTION_OVERVIEW, selectedOverview],
  //   async () => {
  //     const response = await overviewService.getTransactionOverview(
  //       dateRange[0].format('YYYY-MM-DD'),
  //       dateRange[1].format('YYYY-MM-DD'),
  //     );
  //     return response;
  //   },
  //   {
  //     enabled: selectedOverview === OverviewType.REVENUE,
  //   },
  // );

  const {
    data: revenueOverTime,
    refetch: refetchRevenue,
    isLoading: isLoadingRevenueData,
  } = useQuery(
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

  const {
    data: topUsers,
    refetch: refetchTopUser,
    isLoading: isLoadingTopUserData,
  } = useQuery(
    [QueryKey.TOP_USERS, selectedOverview],
    async () => {
      const response = await overviewService.getTopUsersByDepositAmount(
        dateRange[0].format('YYYY-MM-DD'),
        dateRange[1].format('YYYY-MM-DD'),
        limit,
      );
      return response;
    },
    {
      enabled: selectedOverview === OverviewType.TOP_USERS,
    },
  );

  const {
    data: topViewData,
    refetch: refetchTopView,
    isLoading: isLoadingTopViewData,
  } = useQuery(
    [QueryKey.TOP_VIEW, selectedOverview],
    async () => {
      const response = await overviewService.getTopBooksByViews(
        dateRange[0].format('YYYY-MM-DD'),
        dateRange[1].format('YYYY-MM-DD'),
        limit,
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
  }, [selectedOverview, dateRange, limit]);

  const handleExportTopUsers = () => {
    if (!topUsers?.tableData || topUsers.tableData.length === 0) return;

    const startDate = dateRange[0].format('DD-MM-YYYY');
    const endDate = dateRange[1].format('DD-MM-YYYY');
    const fileName = `TopNguoiDung_${startDate}_${endDate}.xlsx`;

    const headerInfo = [
      ['Tiêu đề:', 'Top người dùng'],
      ['Người tạo:', user?.userName],
      ['Thời gian xuất file:', dayjs().format('DD-MM-YYYY HH:mm')],
      [
        'Khoảng thời gian dữ liệu:',
        ` Ngày bắt đầu: ${startDate} _ Ngày kết thúc: ${endDate}`,
      ],
      [' ', ' '],
      [],
    ];

    const data = topUsers.tableData.map((user: any, index: any) => ({
      STT: index + 1,
      'Tên người dùng': user.userName,
      'Số tiền nạp': user.totalAmount,
    }));

    const worksheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(worksheet, headerInfo);
    XLSX.utils.sheet_add_json(worksheet, data, { origin: -1 });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Top Users');

    XLSX.writeFile(workbook, fileName);
  };
  const handleExportTopView = () => {
    if (!topViewData?.tableData || topViewData.tableData.length === 0) return;

    const startDate = dateRange[0].format('DD-MM-YYYY');
    const endDate = dateRange[1].format('DD-MM-YYYY');
    const fileName = `TopSach_${startDate}_${endDate}.xlsx`;

    const headerInfo = [
      ['Tiêu đề:', 'Top sách theo lượt view'],
      ['Người tạo:', user?.userName],
      ['Thời gian xuất file:', dayjs().format('DD-MM-YYYY HH:mm')],
      [
        'Khoảng thời gian dữ liệu:',
        ` Ngày bắt đầu: ${startDate} _ Ngày kết thúc: ${endDate}`,
      ],
      [' ', ' '],
      [],
    ];

    const data = topViewData.tableData.map((book: any, index: any) => ({
      STT: index + 1,
      'Tên sách': book.title,
      'Tổng lượt đọc': book.totalViews,
    }));

    const worksheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(worksheet, headerInfo);
    XLSX.utils.sheet_add_json(worksheet, data, { origin: -1 });
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

    const headerInfo = [
      ['Tiêu đề:', 'Doanh thu theo thời gian'],
      ['Người tạo:', user?.userName],
      ['Thời gian xuất file:', dayjs().format('DD-MM-YYYY HH:mm')],
      [
        'Khoảng thời gian dữ liệu:',
        ` Ngày bắt đầu: ${startDate} _ Ngày kết thúc: ${endDate}`,
      ],
      [' ', ' '],
      [],
    ];

    const data = revenueOverTime.tableData.map((entry: any, index: any) => ({
      STT: index + 1,
      'Tên người nạp': entry.userId.userName,
      'Số tiền nạp': entry.amount,
      'Ngày nạp': dayjs(entry.date).format('DD-MM-YYYY'),
    }));

    const worksheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(worksheet, headerInfo);
    XLSX.utils.sheet_add_json(worksheet, data, { origin: -1 });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Revenue');

    XLSX.writeFile(workbook, fileName);
  };

  const handleTopLimitChange = (value: number) => {
    if (value > 0) {
      setLimit(value);
    }
  };

  return (
    <div className="mx-auto rounded-md bg-white p-2 md:ml-10 md:mr-10">
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
                onChange={handleTopLimitChange}
                options={topOptions}
                className="h-9 w-full"
              />
            </div>
          ) : null}
        </div>
      )}

      {/* Các biểu đồ */}
      <div className="h-screen">
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
              <div className="chart-table-container grid grid-cols-2">
                <div className="chart-container col-span-2 pt-5 md:col-span-1">
                  <div className="h-96 w-5/6">
                    <Bar data={revenueOverTime} />
                  </div>
                </div>

                <div className="table-container col-span-2 md:col-span-1">
                  <div className="mb-2 flex justify-end">
                    <ButtonExport onClick={handleExportRevenue} />
                  </div>

                  <Table
                    columns={revenueTableColumns}
                    dataSource={revenueOverTime.tableData}
                    loading={isLoadingRevenueData}
                    rowKey="id"
                    pagination={{
                      pageSize: 5,
                      showSizeChanger: true,
                      pageSizeOptions: ['5', '10', '20', '30'],
                    }}
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
              </div>
            ) : (
              <div className="flex items-center justify-center">
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
                <div className="chart-container w-1/2 pt-5">
                  <div className="h-96 w-5/6">
                    <Bar data={topUsers} />
                  </div>
                </div>

                <div className="table-container w-1/2">
                  <div className="mb-2 flex justify-end">
                    <ButtonExport onClick={handleExportTopUsers} />
                  </div>

                  <Table
                    columns={topUserTableColumns}
                    dataSource={topUsers.tableData}
                    loading={isLoadingTopUserData}
                    rowKey="id"
                    pagination={{
                      pageSize: 5,
                      showSizeChanger: true,
                      pageSizeOptions: ['5', '10', '20', '30'],
                    }}
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
                <div className="chart-container w-2/3 pt-5">
                  <div className="h-96 w-11/12">
                    <Bar data={topViewData} />
                  </div>
                </div>

                <div className="table-container w-1/3">
                  <div className="mb-2 flex justify-end">
                    <ButtonExport onClick={handleExportTopView} />
                  </div>

                  <Table
                    columns={topViewTableColumns}
                    dataSource={topViewData.tableData}
                    loading={isLoadingTopViewData}
                    rowKey="id"
                    pagination={{
                      pageSize: 5,
                      showSizeChanger: true,
                      pageSizeOptions: ['5', '10', '20', '30'],
                    }}
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
// OverviewPage.getLayout = (page: React.ReactNode) => (
//   <AdminHomePage>{page}</AdminHomePage>
// );
