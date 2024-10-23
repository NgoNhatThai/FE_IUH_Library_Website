'use client';
import { BookModel, BookType } from '@/models/bookModel';
import { Button, Form, Input, Select, InputNumber, Upload, Radio } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { PlusOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { useQuery } from 'react-query';
import { adminService } from '@/services/adminService';
import { QueryKey } from '@/types/api';
import { toast } from 'react-toastify';
import { bookService } from '@/services/bookService';

const { TextArea } = Input;
const { Option } = Select;

const BookManagerPage = () => {
  const [form] = useForm<BookModel>();
  const [imageList, setImageList] = useState([]);

  const { data: categories } = useQuery([QueryKey.CATEGORY], async () => {
    return await adminService.getAllCategory();
  });

  const { data: majors } = useQuery([QueryKey.MAJOR], async () => {
    return await adminService.getAllMajor();
  });

  const { data: authors } = useQuery([QueryKey.AUTHOR], async () => {
    return await adminService.getAllAuthor();
  });

  const categoriesOptions = useMemo(() => {
    return categories?.map((category: any) => (
      <Option key={category._id} value={category._id}>
        {category.name}
      </Option>
    ));
  }, [categories]);

  const majorsOptions = useMemo(() => {
    return majors?.map((major: any) => (
      <Option key={major._id} value={major._id}>
        {major.name}
      </Option>
    ));
  }, [majors]);

  const authorsOptions = useMemo(() => {
    return authors?.map((author: any) => (
      <Option key={author._id} value={author._id}>
        {author.name}
      </Option>
    ));
  }, [authors]);

  const typeOptions = [
    { label: 'Sách ảnh', value: BookType.NORMAL },
    { label: 'Sách nói', value: BookType.VOICE },
  ];

  const onFinish = async (values: BookModel) => {
    const formData = new FormData();
    formData.append('image', imageList[0].originFileObj); // Giả sử bạn đã có file ở đây
    formData.append('title', values.title ? values.title : '');
    formData.append('desc', values.desc ? values.desc : '');
    formData.append('categoryId', values.categoryId ? values.categoryId : '');
    formData.append('authorId', values.authorId ? values.authorId : '');
    formData.append('majorId', values.majorId ? values.majorId : '');
    formData.append('limit', values.limit ? values.limit : '');
    formData.append('price', values.price ? values.price : 0);
    formData.append('type', values.type ? values.type : BookType.NORMAL);

    try {
      const response = await bookService.createBook(formData);
      toast.success('Đăng sách thành công!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  const handleUploadChange = ({ fileList }: any) => {
    console.log('fileList', fileList);
    setImageList(fileList);
    form.setFieldsValue({ image: fileList });
  };

  return (
    <div className="container w-[80%] rounded-md bg-white p-4 md:mb-10">
      <Breadcrumb title="Quản lý sách" />
      <hr className="my-4" />
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <h1 className="mb-4 text-2xl font-semibold">Thêm sách mới</h1>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <Form.Item
              className="h-full pl-5 pr-5"
              label="Ảnh bìa"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
              // rules={[{ required: true, message: 'Vui lòng chọn ảnh bìa!' }]}
            >
              <Upload
                className="w-[80%]"
                type="drag"
                listType="picture"
                fileList={imageList}
                accept="image/*"
                maxCount={1}
                onChange={handleUploadChange}
                beforeUpload={() => false}
              >
                {imageList.length < 1 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
              <p className="mt-2 text-center text-sm text-gray-400">
                Vui lòng tải lên ảnh có tỷ lệ 1:1.5, kích thước tối thiểu
                1000x1500 pixels để đảm bảo chất lượng bìa sách tốt nhất.
              </p>
            </Form.Item>
          </div>
          <div className="col-span-1">
            <Form.Item
              label="Tên sách"
              name="title"
              rules={[{ required: true, message: 'Vui lòng nhập tên sách!' }]}
            >
              <Input placeholder="Nhập tên sách" />
            </Form.Item>

            <Form.Item label="Mô tả" name="desc">
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item label="Danh mục" name="categoryId">
              <Select placeholder="Chọn danh mục">{categoriesOptions}</Select>
            </Form.Item>

            <Form.Item label="Tác giả" name="authorId">
              <Select placeholder="Chọn tác giả">{authorsOptions}</Select>
            </Form.Item>

            <Form.Item label="Chuyên ngành" name="majorId">
              <Select placeholder="Chọn chuyên ngành">{majorsOptions}</Select>
            </Form.Item>

            <Form.Item label="Giới hạn độ tuổi" name="limit">
              <Input placeholder="Nhập giới hạn độ tuổi" defaultValue={0} />
            </Form.Item>

            <Form.Item name="type">
              <Radio.Group
                options={typeOptions}
                defaultValue={BookType.NORMAL}
              />
            </Form.Item>

            <Form.Item label="Giá bán" name="price">
              <InputNumber
                min={0}
                className="w-full"
                addonAfter="VND"
                defaultValue={0}
              />
            </Form.Item>
          </div>
        </div>

        <div className="flex w-full items-end justify-end">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng sách
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default BookManagerPage;
