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
import { Table } from 'antd';
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
import { Bar } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { userService } from '@/services/userService';

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
    <div className="container mx-auto px-4">
      {/* Breadcrumb */}
      <div className="relative mb-6 rounded-lg bg-white p-4 shadow-md">
        <Breadcrumb title="Thống kê cá nhân" />
      </div>

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Thống kê cá nhân</h1>
      </div>

      {/* Bộ lọc ngày */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-4 md:col-span-1">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Chọn khoảng thời gian
            </label>
            <DateRangePicker
              allowClear
              format={DATE_FORMAT_DDMMYYYY}
              value={[dayjs(dateRange[0]), dayjs(dateRange[1])]}
              onChange={(date) => handleDateChange(date)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Phần biểu đồ và bảng */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Biểu đồ */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          {selectedOverview === OverviewType.TIME_READ && (
            <div className="flex flex-col items-center">
              {dataReadTime &&
              dataReadTime.datasets[0].data.reduce(
                (a: any, b: any) => a + b,
                0,
              ) > 0 ? (
                <div className="h-96 w-full">
                  <Bar
                    data={dataReadTime}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              ) : (
                <p className="text-gray-500">Không có dữ liệu để hiển thị.</p>
              )}
            </div>
          )}
        </div>

        {/* Bảng dữ liệu */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          {totalReadTime > 0 && (
            <div className="mb-4 text-sm text-gray-700">
              <p>
                Thời gian đọc trung bình: {averageReadTime.toFixed(1)} phút
                trong vòng {totalDays} ngày
              </p>
              <p>
                Tỉ lệ đọc sách hằng ngày: {readingRate}% (số ngày đọc:{' '}
                {readingDays}/{totalDays})
              </p>
            </div>
          )}
          <Table
            columns={readTimeColumns}
            dataSource={expandedDataSource}
            pagination={{
              pageSize: 5,
              showSizeChanger: false,
            }}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalStatistics;
