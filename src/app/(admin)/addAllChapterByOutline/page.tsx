'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Form, Upload, Spin, Checkbox, Modal, message } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { useQuery } from 'react-query';
import { QueryKey } from '@/types/api';
import { bookService } from '@/services/bookService';
import { BookDetailResponse } from '@/models/bookModel';

const AddAllChapter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get('id');
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [isShortBook, setIsShortBook] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReviewModalVisible, setReviewModalVisible] = useState(false);
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

  const addContent = async () => {
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

      try {
        if (isShortBook) {
          formData.append('status', 'FINISH');
          const response = await bookService.addChapter(formData);
          console.log('response1', response);
          router.push(`/bookManager`);
          message.success('Thêm nội dung thành công!');
          form.resetFields();
          setFileList([]);
          return;
        } else {
          const response = await bookService.addChapterbyOutline(formData);
          if (response.status == 200) {
            refetch();
            message.success('Thêm nội dung thành công!');
            form.resetFields();
            setFileList([]);
            setReviewModalVisible(true);
          } else {
            message.error('Thêm nội dung thất bại!');
            setIsModalVisible(true);
          }
        }
      } catch (error) {
        console.error('Error:', error);
        message.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <Spin spinning={loading} size="large" tip="Đang xử lý...">
      <h1 className="text-center text-3xl font-semibold">Thêm nội dung sách</h1>

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

            <Form.Item>
              <Checkbox
                checked={isShortBook}
                onChange={(e) => setIsShortBook(e.target.checked)}
              >
                Sách không theo chương
              </Checkbox>
            </Form.Item>
            <div className="mt-4 text-right">
              <Button type="primary" onClick={addContent}>
                Đăng sách
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Modal
        title="Thông báo"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        className="rounded-lg p-2 text-base"
      >
        <p className="inline">
          Mục lục của file PDF có lẽ sai cấu trúc. Có thể tham khảo mẫu
        </p>
        <Button
          type="link"
          href="https://drive.google.com/uc?export=download&id=1NQSWXgxHX8PLw60LFj-RfmuYyfZqJuM-"
          className="font-semibold text-blue-500 underline"
        >
          tại đây
        </Button>

        <div className="mt-5 flex justify-end space-x-4">
          <Button
            onClick={() => {
              setIsModalVisible(false);
            }}
            className="border-gray-300 text-gray-500 hover:text-gray-700"
          >
            Bỏ qua
          </Button>
          <Button
            type="primary"
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => {
              router.push(`/addAllChapter?id=${bookId}`);
            }}
          >
            Tạo thủ công
          </Button>
        </div>
      </Modal>
      <Modal
        title="Xem lại sách đã đăng"
        visible={isReviewModalVisible}
        onCancel={() => setReviewModalVisible(false)}
        footer={null}
        centered
        className="rounded-lg p-2 text-base"
      >
        <p className="inline">
          Bạn có muốn xem lại nội dung sách vừa đăng tải không ?
        </p>

        <div className="mt-5 flex justify-end space-x-4">
          <Button
            onClick={() => {
              setIsModalVisible(false);
            }}
            className="border-gray-300 text-gray-500 hover:text-gray-700"
          >
            Bỏ qua
          </Button>
          <Button
            type="primary"
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => {
              router.push(`/book/${bookId}`);
            }}
          >
            Xem chi tiết
          </Button>
        </div>
      </Modal>
    </Spin>
  );
};

export default AddAllChapter;
