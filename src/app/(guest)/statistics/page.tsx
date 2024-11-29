'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, { useEffect, useState } from 'react';
// import { Pie, Bar } from 'react-chartjs-2';
import DateRangePicker from '@/components/DateRangePicker';
import { OverviewType } from '@/constants/overviewType';
import { userInfo } from '@/models/userInfo';
import { overviewService } from '@/services/overviewService';
import { QueryKey } from '@/types/api';
import { readTimeColumns } from '@/ultils/column';
import { DATE_FORMAT_DDMMYYYY } from '@/ultils/dateUtils';
import { Radio, Table } from 'antd';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import dayjs from 'dayjs';
import { Bar, Pie } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { userService } from '@/services/userService';

// import ButtonExport from '@/components/Button/ButtonExport';
// import ButtonExport from '@/components/Button/ButtonExport';

// import {
//   revenueTableColumns,
//   topUserTableColumns,
//   topViewTableColumns,
// } from '@/ultils/column';

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

const PersonalStatistics = () => {
  const storedUserInfo =
    typeof window !== 'undefined' ? localStorage.getItem('userInfo') : '';
  const userInfo: userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  const [selectedOverview, setSelectedOverview] = useState(
    OverviewType.TIME_READ,
  );
  const {
    data: dataReadTime,
    refetch: refetchReadTime,
    isLoading: isLoadingReadTime,
  } = useQuery(
    [QueryKey.TIME_READ, selectedOverview],
    async () => {
      const response = await overviewService.getReadTime(
        dateRange[0].format('YYYY-MM-DD'),
        dateRange[1].format('YYYY-MM-DD'),
        userInfo?.userRaw?._id,
      );
      return response;
    },
    {
      enabled: selectedOverview === OverviewType.TIME_READ,
    },
  );
  const { data: dataINCOMEEXPENSE, refetch: refetchINCOMEEXPENSE } = useQuery(
    [QueryKey.INCOMEEXPENSE, selectedOverview],
    async () => {
      const response = await userService.getINCOMEEXPENSE(
        dateRange[0].format('YYYY-MM-DD'),
        dateRange[1].format('YYYY-MM-DD'),
        userInfo?.userRaw?._id,
      );
      return response;
    },
    {
      enabled: selectedOverview === OverviewType.INCOMEEXPENSE,
    },
  );
  let income = 0;
  let expense = 0;

  dataINCOMEEXPENSE?.data?.history.forEach((transaction: any) => {
    if (transaction.amount < 0) {
      expense += Math.abs(transaction.amount);
    } else {
      income += transaction.amount;
    }
  });

  const pieChartData = {
    labels: ['Nạp vào', 'Chi ra'],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverBackgroundColor: ['#66bb6a', '#ef5350'],
      },
    ],
  };
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(7, 'day'),
    dayjs(),
  ]);
  const handleDateChange = (dates: any) => {
    setDateRange(dates);
  };
  const options = [
    {
      label: 'Thời gian đọc sách',
      value: OverviewType.TIME_READ,
    },
    {
      label: 'Thu chi',
      value: OverviewType.INCOMEEXPENSE,
    },
  ];
  useEffect(() => {
    if (selectedOverview === OverviewType.TIME_READ) {
      refetchReadTime();
    }
    if (selectedOverview === OverviewType.INCOMEEXPENSE) {
      refetchINCOMEEXPENSE();
    }
  }, [selectedOverview, dateRange]);
  const expandedDataSource = dataReadTime?.details?.flatMap((item: any) =>
    item.details.map((detail: any) => ({
      key: detail._id,
      stt: item.details.indexOf(detail) + 1,
      title: detail.title,
      readTime: `${detail.readTime} phút`,
      date: dayjs(item.date).format('DD/MM/YYYY'),
    })),
  );
  const totalReadTime = dataReadTime?.datasets[0].data.reduce(
    (a: number, b: number) => a + b,
    0,
  );
  const readingDays = dataReadTime?.datasets[0].data.filter(
    (time: any) => time > 0,
  ).length;

  const totalDays = dayjs(dateRange[1]).diff(dayjs(dateRange[0]), 'day') + 1;
  const averageReadTime = readingDays > 0 ? totalReadTime / totalDays : 0;
  const readingRate =
    totalDays > 0 ? ((readingDays / totalDays) * 100).toFixed(1) : 0;

  // const handleExportReadTime = async () => {
  //   if (!dataReadTime?.details || dataReadTime?.details.length === 0) return;

  //   const startDate = dateRange[0].format('DD-MM-YYYY');
  //   const endDate = dateRange[1].format('DD-MM-YYYY');
  //   const fileName = `ThoiGianDocSach_${startDate}_${endDate}.xlsx`;

  //   const headerInfo = [
  //     ['Tiêu đề:', 'Thống kê thời gian đọc sách của bạn'],
  //     ['Thời gian xuất file:', dayjs().format('DD-MM-YYYY HH:mm')],
  //     [
  //       'Khoảng thời gian dữ liệu:',
  //       `Ngày bắt đầu: ${startDate} _ Ngày kết thúc: ${endDate}`,
  //     ],
  //   ];

  //   const headers = [['STT', 'Tiêu đề sách', 'Thời gian đọc', 'Ngày đọc']];
  //   const data = dataReadTime?.details?.filter(
  //     (item: any) => item.totalReadTime > 0,
  //   );
  //   console.log('data', data);
  //   const dataExport = data.details.map((item: any, index: any) => [
  //     index + 1,
  //     item.details.bookId,
  //     item.totalReadTime,
  //     dayjs(item.date).format('DD/MM/YYYY'),
  //   ]);

  //   const workbook = new ExcelJS.Workbook();
  //   const worksheet = workbook.addWorksheet('Top Users');

  //   headerInfo.forEach((row) => {
  //     const headerRow = worksheet.addRow(row);
  //     headerRow.eachCell((cell: any, colIndex: any) => {
  //       cell.font = {
  //         bold: true,
  //         size: 14,
  //         color: { argb: colIndex === 1 ? 'FF000000' : 'FF0073CF' },
  //       };
  //       cell.alignment = {
  //         vertical: 'middle',
  //         horizontal: colIndex === 1 ? 'left' : 'center',
  //       };
  //       cell.fill = {
  //         type: 'pattern',
  //         pattern: 'solid',
  //         fgColor: { argb: 'FFEFEFEF' },
  //       };
  //       cell.border = {
  //         top: { style: 'thin' },
  //         bottom: { style: 'thin' },
  //         left: { style: 'thin' },
  //         right: { style: 'thin' },
  //       };
  //     });
  //   });

  //   worksheet.addRow([]);

  //   const headerRow = worksheet.addRow(headers[0]);
  //   headerRow.eachCell((cell: any) => {
  //     cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  //     cell.fill = {
  //       type: 'pattern',
  //       pattern: 'solid',
  //       fgColor: { argb: '4472C4' },
  //     };
  //     cell.alignment = { vertical: 'middle', horizontal: 'center' };
  //     cell.border = {
  //       top: { style: 'thin' },
  //       bottom: { style: 'thin' },
  //       left: { style: 'thin' },
  //       right: { style: 'thin' },
  //     };
  //   });

  //   data.forEach((rowData: any) => {
  //     const row = worksheet.addRow(rowData);
  //     row.eachCell((cell: any) => {
  //       cell.alignment = { vertical: 'middle', horizontal: 'center' };
  //       cell.border = {
  //         top: { style: 'thin' },
  //         bottom: { style: 'thin' },
  //         left: { style: 'thin' },
  //         right: { style: 'thin' },
  //       };
  //     });
  //   });

  //   worksheet.columns = [{ width: 30 }, { width: 62 }, { width: 20 }];

  //   const buffer = await workbook.xlsx.writeBuffer();
  //   const blob = new Blob([buffer], {
  //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //   });
  //   const link = document.createElement('a');
  //   link.href = URL.createObjectURL(blob);
  //   link.download = fileName;
  //   link.click();
  // };
  return (
    <>
      <div className="relative h-full rounded-md bg-white p-2 md:p-4">
        <Breadcrumb title="Thống kê cá nhân" />
      </div>
      <div className="mx-auto rounded-md bg-white p-2 pl-4">
        <h1 className="mb-5 text-center text-2xl font-bold">
          Thống kê cá nhân
        </h1>

        <Radio.Group
          className="mb-5 flex justify-center space-x-2"
          options={options}
          defaultValue={OverviewType.TIME_READ}
          onChange={(e) => setSelectedOverview(e.target.value)}
          optionType="button"
          buttonStyle="solid"
        />

        <div className="w-full p-4">
          <div className="grid w-full grid-cols-4 space-x-4">
            <div className="col-span-1">
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
          </div>
        </div>

        {/* Các biểu đồ */}
        <div className="h-screen">
          {selectedOverview === OverviewType.TIME_READ && (
            <>
              <h2 className="mb-3 text-center text-xl font-semibold">
                Thời gian đọc sách của bạn
              </h2>
              {dataReadTime &&
              dataReadTime.datasets[0].data.reduce(
                (a: number, b: number) => a + b,
                0,
              ) > 0 ? (
                <div className="chart-table-container grid grid-cols-2">
                  <div className="chart-container col-span-2 pt-5 md:col-span-1">
                    <div className="h-96 w-5/6">
                      <Bar data={dataReadTime} />
                    </div>
                  </div>

                  <div className="table-container col-span-2 md:col-span-1">
                    <div className="mb-2 flex justify-end">
                      {/* <ButtonExport onClick={handleExportReadTime} /> */}
                    </div>

                    <Table
                      columns={readTimeColumns}
                      dataSource={expandedDataSource}
                      loading={isLoadingReadTime}
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
                        marginTop: '47px',
                      }}
                    />

                    {/* Hiển thị thông tin thời gian đọc trung bình và tỉ lệ đọc sách hằng ngày */}
                    {totalReadTime > 0 && (
                      <div className="mt-4">
                        <span>
                          Thời gian đọc trung bình: {averageReadTime.toFixed(1)}{' '}
                          phút trong vòng {totalDays} ngày
                        </span>
                        <br />
                        <span>
                          Tỉ lệ đọc sách hằng ngày: {readingRate}% (số ngày đọc:{' '}
                          {readingDays}/{totalDays})
                        </span>
                      </div>
                    )}
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

          {selectedOverview === OverviewType.INCOMEEXPENSE && (
            <div className="chart-container" style={{ height: '500px' }}>
              <h2 className="mb-10 text-center text-xl font-semibold">
                Tỷ lệ thu chi
              </h2>
              {income || expense ? (
                <div className="mx-auto h-96 w-96">
                  <Pie data={pieChartData} />
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
    </>
  );
};

export default PersonalStatistics;
