'use client';
import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  Upload,
  message,
  Typography,
  Table,
  Spin,
} from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { BookDetailResponse } from '@/models/bookModel';
import { QueryKey } from '@/types/api';
import { bookService } from '@/services/bookService';
import { toast } from 'react-toastify';
const AddAllChapterOutline = () => {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const bookId = searchParams.get('id');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // Đường dẫn tệp PDF
  const [chapters, setChapters] = useState<
    { title: string; pages: number[] }[]
  >([]);
  const [lastEndPage, setLastEndPage] = useState(0);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleAddChapter = () => {
    form
      .validateFields()
      .then((values) => {
        const chapterTitle = values.chapterTitle;
        const startPage = parseInt(values.startPage, 10);
        const endPage = parseInt(values.endPage, 10);

        if (endPage < startPage) {
          message.error('Trang kết thúc không được nhỏ hơn trang bắt đầu!');
          return;
        }

        if (startPage <= lastEndPage) {
          message.error(
            `Trang bắt đầu phải lớn hơn ${lastEndPage}. Vui lòng nhập lại!`,
          );
          return;
        }

        const pages = Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index,
        );

        const newChapter = { title: chapterTitle, pages };
        setChapters((prevChapters) => [...prevChapters, newChapter]);
        setLastEndPage(endPage);

        form.resetFields();
      })
      .catch((error) => {
        console.error('Validation Failed:', error);
      });
  };

  const formatPages = (pages: any) => {
    const maxPagesToShow = 5;
    if (pages.length > maxPagesToShow) {
      return `${pages.slice(0, 3).join(', ')}, ..., ${pages.slice(-2).join(', ')}`;
    }
    return pages.join(', ');
  };

  const handleFileChange = (info: any) => {
    const latestFileList = info.fileList.slice(-1);
    setFileList(latestFileList);

    if (latestFileList.length > 0) {
      const file = latestFileList[0];
      const url = URL.createObjectURL(file.originFileObj);
      setPdfUrl(url);
    } else {
      setPdfUrl(null);
    }
  };
  const columns = [
    {
      title: 'Tên chương',
      dataIndex: 'title',
      key: 'title',
      width: '80%',
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: 'Danh sách trang',
      dataIndex: 'pages',
      key: 'pages',
      render: (text: any) => (
        <span className="font-semibold">{formatPages(text)}</span>
      ),
    },
  ];
  const {
    data: book,
    isLoading,
    refetch,
  } = useQuery<BookDetailResponse>([QueryKey.BOOK, bookId], async () => {
    if (bookId) {
      return await bookService.getDetailBook(bookId);
    }
    throw new Error('Book ID is null');
  });
  const [loading, setLoading] = useState(false);
  const addContent = async () => {
    if (!pdfUrl) {
      message.error('Vui lòng chọn file PDF!');
      return;
    }
    if (chapters.length === 0) {
      message.error('Vui lòng nhập chương!');
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append('contentId', book?.data?.content?._id || '');
    if (fileList[0].originFileObj) {
      formData.append('file', fileList[0].originFileObj);
    } else {
      throw new Error('File is undefined');
    }

    // Tạo mảng chapterTitles và chapterPaginations từ dữ liệu chương đã nhập
    const chapterTitles = chapters.map((chapter) => chapter.title);
    const chapterPaginations = chapters.map((chapter) => chapter.pages);

    formData.append('chapterTitles', JSON.stringify(chapterTitles));
    formData.append('chapterPaginations', JSON.stringify(chapterPaginations));

    try {
      const response = await bookService.addMultiChapters(formData);
      console.log('response', response);
      if (response.status == 200) {
        refetch();
        toast.success('Thêm nội dung sách thành công!');
        form.resetFields();
        setFileList([]);
        setChapters([]);
      } else {
        toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
        form.resetFields();
        setFileList([]);
        setChapters([]);
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} size="large" tip="Đang xử lý...">
      <h1 className="text-center text-3xl font-semibold">Thêm nội dung sách</h1>
      {/* <p className="text-center text-gray-500">
        {' '}
        (Nếu sách không có chương, bạn có thể chọn file pdf rồi bỏ qua bước thêm
        chương)
      </p> */}
      <div className="container flex w-full justify-between gap-3 rounded-md bg-white px-2">
        <div className="w-1/2 rounded-md bg-white p-4 shadow-md">
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleFileChange}
            accept=".pdf"
            maxCount={1}
          >
            <Button type="primary">Chọn file PDF</Button>
          </Upload>

          {pdfUrl && (
            <div className="mt-4 h-[calc(100vh-230px)] overflow-auto border">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={pdfUrl}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </div>
          )}
        </div>

        {/* Phần bên phải: Form thêm chương */}
        <div className="w-1/2 rounded-md bg-white p-4 shadow-md">
          <Form form={form} layout="vertical">
            <Form.Item
              label="Tiêu đề chương"
              name="chapterTitle"
              rules={[
                { required: true, message: 'Vui lòng nhập tiêu đề chương!' },
              ]}
            >
              <Input placeholder="Nhập tiêu đề chương" />
            </Form.Item>

            <Form.Item
              label="Trang bắt đầu"
              name="startPage"
              rules={[
                { required: true, message: 'Vui lòng nhập trang bắt đầu!' },
              ]}
            >
              <Input type="number" placeholder="Nhập trang bắt đầu" />
            </Form.Item>

            <Form.Item
              label="Trang kết thúc"
              name="endPage"
              rules={[
                { required: true, message: 'Vui lòng nhập trang kết thúc!' },
              ]}
            >
              <Input type="number" placeholder="Nhập trang kết thúc" />
            </Form.Item>

            <div className="flex justify-between">
              <Button type="primary" onClick={handleAddChapter}>
                Thêm Chương
              </Button>
              <Button onClick={addContent} type="primary">
                Hoàn Thành
              </Button>
            </div>
          </Form>
          <Typography.Title level={4} className="mt-6 text-center">
            Danh sách các chương
          </Typography.Title>
          {/* <List
            dataSource={chapters}
            renderItem={(chapter) => (
              <List.Item>
                <div className="flex w-full justify-between">
                  <span>{chapter.title}</span>
                  <span className="text-sm text-gray-500">
                    {formatPages(chapter.pages)}
                  </span>
                </div>
              </List.Item>
            )}
            bordered
            className="mb-5 max-h-64 overflow-y-auto"
          /> */}
          <Table
            columns={columns}
            dataSource={chapters}
            bordered
            pagination={{
              pageSize: 4,
              showSizeChanger: true,
            }}
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
      </div>
    </Spin>
  );
};

export default AddAllChapterOutline;
