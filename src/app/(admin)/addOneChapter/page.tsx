'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Button,
  Form,
  Input,
  Upload,
  message,
  List,
  Typography,
  Spin,
  Checkbox,
} from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { useQuery } from 'react-query';
import { QueryKey } from '@/types/api';
import { bookService } from '@/services/bookService';
import { BookDetailResponse } from '@/models/bookModel';
import { toast } from 'react-toastify';

const AddOneChapter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get('id');
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [isChapterFinal, setIsChapterFinal] = useState(false);
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

  const handleFileChange = (info: any) => {
    const latestFileList = info.fileList.slice(-1);
    setFileList(latestFileList);

    if (latestFileList.length > 0) {
      const fileName = latestFileList[0].name.replace(/\.[^/.]+$/, '');
      form.setFieldsValue({ chapterName: fileName });
    }
  };

  const addChapter = async () => {
    form.validateFields().then(async (values) => {
      if (!fileList.length) {
        message.error('Vui lòng tải lên file PDF!');
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append('contentId', book?.data?.content?._id || '');
      if (fileList[0].originFileObj) {
        formData.append('file', fileList[0].originFileObj); // Thêm file
      } else {
        throw new Error('File is undefined');
      }
      formData.append('title', values.chapterName); // Thêm title
      if (isChapterFinal) {
        formData.append('status', 'FINISH');
      }
      try {
        const response = await bookService.addChapter(formData);
        console.log('response', response);
        if (isChapterFinal) {
          router.push(`/bookManager`);
          return;
        }
        refetch();
        toast.success('Thêm chương mới thành công!');
        form.resetFields();
        setFileList([]);
      } catch (error) {
        console.error('Error:', error);
        message.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
      } finally {
        setLoading(false);
      }
    });
  };

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <Spin spinning={loading} size="large" tip="Đang xử lý...">
      <h1 className="text-center text-3xl font-semibold">Thêm chương</h1>

      <div className="container flex w-full justify-between rounded-md bg-white p-10">
        <div className="w-1/3 justify-items-center">
          {book?.data?.image && (
            <img
              src={book.data.image}
              alt="Book Cover"
              className="mb-4 w-5/6 rounded-lg object-cover"
            />
          )}
          <h2 className="mb-4 text-center text-xl font-bold">
            {book?.data?.title}
          </h2>
        </div>

        <div className="w-1/2">
          <Typography.Title level={4} className="mb-2 text-center">
            Danh sách các chương hiện có
          </Typography.Title>
          <List
            dataSource={book?.data?.content?.chapters || []}
            renderItem={(chapter) => (
              <List.Item>
                <div className="flex w-full justify-between">
                  <span>{chapter.title}</span>
                  <span className="text-sm text-gray-500">
                    {chapter.createdAt
                      ? new Date(chapter.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
              </List.Item>
            )}
            bordered
            className="mb-5 max-h-64 overflow-y-auto"
          />
          <Form form={form} layout="vertical">
            <Form.Item
              label="Tải lên file PDF"
              name="file"
              rules={[{ required: true, message: 'Vui lòng chọn file PDF!' }]}
            >
              <Upload
                beforeUpload={() => false} // Ngăn chặn upload tự động
                fileList={fileList}
                onChange={handleFileChange}
                accept=".pdf"
                maxCount={1} // Giới hạn chỉ chọn một tệp
              >
                <Button type="primary">Chọn file PDF</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Tên Chapter"
              name="chapterName"
              rules={[{ required: true, message: 'Vui lòng nhập tên chương!' }]}
            >
              <Input placeholder="Tên Chapter" />
            </Form.Item>
            <Form.Item>
              <Checkbox
                checked={isChapterFinal}
                onChange={(e) => setIsChapterFinal(e.target.checked)}
              >
                Chương cuối
              </Checkbox>
            </Form.Item>
            <div className="mt-4 text-right">
              <Button type="primary" onClick={addChapter}>
                Đăng chương
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default AddOneChapter;
