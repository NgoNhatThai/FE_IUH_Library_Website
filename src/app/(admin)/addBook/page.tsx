'use client';
import { BookModel } from '@/models/bookModel';
import {
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
  Modal,
  DatePicker,
  Spin,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { PlusOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { adminService } from '@/services/adminService';
import { QueryKey } from '@/types/api';
import { toast } from 'react-toastify';
import { bookService } from '@/services/bookService';
import { CategoryModel, CategoryStatus } from '@/models';
import { AuthorModel, AuthorStatus } from '@/models/authorModel';
import { MajorModel } from '@/models/majorModel';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

const { TextArea } = Input;
const { Option } = Select;

const AddBookPage = () => {
  const router = useRouter();

  const [form] = useForm<BookModel>();
  const [formCategory] = useForm<CategoryModel>();
  const [formAuthor] = useForm<AuthorModel>();
  const [formMajor] = useForm<MajorModel>();
  const [imageList, setImageList] = useState<any>([]);
  const [isModalCatergory, setIsModalCatergor] = useState(false);
  const [isModalAuthor, setIsModalAuthor] = useState(false);
  const [isModalMajor, setIsModalMajor] = useState(false);
  const [isModalAddChapter, setIsModalAddChapter] = useState(false);
  const [bookResponse, setBookResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: categories, refetch: refetchCategories } = useQuery(
    [QueryKey.CATEGORY],
    async () => {
      return await adminService.getAllCategory();
    },
  );
  const { data: majors, refetch: refetchMajor } = useQuery(
    [QueryKey.MAJOR],
    async () => {
      return await adminService.getAllMajor();
    },
  );

  const { data: authors, refetch: refetchAuthors } = useQuery(
    [QueryKey.AUTHOR],
    async () => {
      return await adminService.getAllAuthor();
    },
  );

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

  const CreateBook = async (values: BookModel) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('image', imageList[0].originFileObj);
    formData.append('title', values.title ? values.title : '');
    if (values.desc) {
      formData.append('desc', values.desc);
    }
    if (values.categoryId) {
      formData.append('categoryId', String(values.categoryId));
    }
    if (values.authorId) {
      formData.append('authorId', String(values.authorId));
    }
    if (values.majorId) {
      formData.append('majorId', String(values.majorId));
    }
    if (values.limit) {
      formData.append('limit', values.limit);
    }
    if (values.price) {
      formData.append('price', String(values.price));
    }

    try {
      const response = await bookService.createBook(formData);
      if (response.status == 200) {
        setBookResponse(response?.data?._id);
        toast.success('Đăng sách thành công!');
        setIsModalAddChapter(true);
      } else {
        toast.success('Có lỗi xảy ra khi đăng sách!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
    } finally {
      setLoading(false);
    }
  };
  const handleChapterOption = (option: string) => {
    if (bookResponse) {
      if (option === 'chapter') {
        router.push(`/addOneChapter?id=${bookResponse}`);
      } else if (option === 'full') {
        router.push(`/addAllChapterByOutline?id=${bookResponse}`);
      }
      setIsModalAddChapter(false);
    } else {
      toast.error('Không có dữ liệu để xử lý');
    }
  };
  const handleUploadChange = ({ fileList }: any) => {
    console.log('fileList', fileList);
    setImageList(fileList);
    form.setFieldsValue({ image: fileList });
  };
  const handleOkModalCategory = async () => {
    try {
      const values = await formCategory.validateFields(['name', 'desc']);
      const data: CategoryModel = {
        name: values.name,
        desc: values.desc,
        status: CategoryStatus.ACTIVE,
      };
      await adminService.createCategory(data);
      toast.success('Thêm danh mục thành công!');
      formCategory.resetFields();
      refetchCategories();
      setIsModalCatergor(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };
  const handleOkModalAuthor = async () => {
    try {
      const values = await formAuthor.validateFields([
        'name',
        'desc',
        'birthDate',
      ]);
      const data: AuthorModel = {
        name: values.name,
        desc: values.desc,
        birthDate: values.birthDate,
        status: AuthorStatus.ACTIVE,
      };
      await adminService.createAuthor(data);
      toast.success('Thêm tác giả thành công!');
      formAuthor.resetFields();
      refetchAuthors();
      setIsModalAuthor(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };
  const handleOkModalMajor = async () => {
    try {
      const values = await formMajor.validateFields(['name', 'desc']);
      const data: MajorModel = {
        name: values.name,
        desc: values.desc,
        status: 'ACTIVE',
      };
      await adminService.createMajor(data);
      toast.success('Thêm chuyên ngành thành công!');
      formMajor.resetFields();
      refetchMajor();
      setIsModalMajor(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };
  return (
    <Spin spinning={loading} size="large" tip="Đang xử lý...">
      <div className="container w-[80%] rounded-md bg-white p-4 md:mb-10">
        {/* <Breadcrumb title="Quản lý sách" /> */}
        <hr className="my-4" />
        <Form form={form} layout="vertical" onFinish={CreateBook}>
          <h1 className="mb-4 text-2xl font-semibold">Thêm sách mới</h1>
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <Form.Item
                className="h-full pl-5 pr-5"
                label="Ảnh bìa"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={(e) => e && e.fileList}
                rules={[{ required: true, message: 'Vui lòng chọn ảnh bìa!' }]}
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

              <Form.Item
                label={
                  <div className="flex items-center justify-items-center">
                    Danh mục
                    <Button
                      type="link"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        setIsModalCatergor(true);
                      }}
                      style={{ marginLeft: 8 }}
                    />
                  </div>
                }
                name="categoryId"
              >
                <Select placeholder="Chọn danh mục">{categoriesOptions}</Select>
              </Form.Item>

              <Form.Item
                label={
                  <div className="flex items-center justify-items-center">
                    Tác giả
                    <Button
                      type="link"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        setIsModalAuthor(true);
                      }}
                      style={{ marginLeft: 8 }}
                    />
                  </div>
                }
                name="authorId"
              >
                <Select placeholder="Chọn tác giả">{authorsOptions}</Select>
              </Form.Item>

              <Form.Item
                label={
                  <div className="flex items-center justify-items-center">
                    Chuyên ngành
                    <Button
                      type="link"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        setIsModalMajor(true);
                      }}
                      style={{ marginLeft: 8 }}
                    />
                  </div>
                }
                name="majorId"
              >
                <Select placeholder="Chọn chuyên ngành">{majorsOptions}</Select>
              </Form.Item>

              <Form.Item label="Giới hạn độ tuổi" name="limit">
                <Input placeholder="Nhập giới hạn độ tuổi" defaultValue={0} />
              </Form.Item>

              {/* <Form.Item name="type">
              <Radio.Group
                options={typeOptions}
                defaultValue={BookType.NORMAL}
              />
            </Form.Item> */}
              <Form.Item
                label="Giá bán"
                name="price"
                rules={[{ type: 'number', message: 'Vui lòng nhập số!' }]}
              >
                <InputNumber
                  min={0}
                  className="w-full"
                  addonAfter="VND"
                  defaultValue={0}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </div>
          </div>

          <Modal
            title="Thêm danh mục mới"
            open={isModalCatergory}
            onOk={handleOkModalCategory}
            onCancel={() => setIsModalCatergor(false)}
          >
            <Form form={formCategory} layout="vertical">
              <Form.Item
                label="Tên danh mục"
                name="name"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên danh mục!' },
                ]}
              >
                <Input placeholder="Nhập tên danh mục" />
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="desc"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="Thêm tác giả mới"
            open={isModalAuthor}
            onOk={handleOkModalAuthor}
            onCancel={() => setIsModalAuthor(false)}
          >
            <Form form={formAuthor} layout="vertical">
              <Form.Item
                label="Tên tác giả"
                name="name"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên tác giả!' },
                ]}
              >
                <Input placeholder="Nhập tên tác giả" />
              </Form.Item>
              <Form.Item
                label="Ngày sinh"
                name="birthDate"
                rules={[
                  { required: true, message: 'Vui lòng nhập ngày sinh!' },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  style={{ width: '100%' }}
                  size="large"
                  placeholder="Chọn ngày sinh"
                  disabledDate={(current) =>
                    current && current > dayjs().endOf('day')
                  }
                />
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="desc"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Thêm chuyên ngành mới"
            open={isModalMajor}
            onOk={handleOkModalMajor}
            onCancel={() => setIsModalMajor(false)}
          >
            <Form form={formMajor} layout="vertical">
              <Form.Item
                label="Tên chuyên ngành"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên chuyên ngành!',
                  },
                ]}
              >
                <Input placeholder="Nhập tên chuyên ngành" />
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="desc"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </Form>
          </Modal>
          <div className="flex w-full items-end justify-end">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng sách
              </Button>
            </Form.Item>
          </div>
        </Form>
        <Modal open={isModalAddChapter} footer={null} closable={false}>
          <div className="text-center">
            <p className="mb-6 text-lg">
              Bạn muốn đăng nội dung sách theo từng chương hay đăng toàn bộ ?
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                type="primary"
                onClick={() => handleChapterOption('chapter')}
              >
                Đăng theo chương
              </Button>
              <Button
                style={{
                  backgroundColor: '#FF5733',
                  color: 'white',
                  border: 'none',
                }}
                onClick={() => handleChapterOption('full')}
              >
                Đăng toàn bộ
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Spin>
  );
};

export default AddBookPage;
