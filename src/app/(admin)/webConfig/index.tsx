import React from 'react';
import { Form, Input, Select, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Config } from '@/models/configModel';
import { adminService } from '@/services/adminService';
import { useQuery } from 'react-query';
import { QueryKey } from '@/types/api';
// import { CategoryModel } from '@/models';
import { toast } from 'react-toastify';

const { Option } = Select;

const WebConfig = () => {
  const [form] = Form.useForm<Config>();

  const onFinish = async (values: Config) => {
    try {
      await adminService.createOrUpdateConfig(values);
      toast.success('Cập nhật thành công');
    } catch (error) {
      console.log(error);
      toast.error('Cập nhật thất bại');
    }
  };

  const { data: categories } = useQuery(
    [QueryKey.CATEGORY],
    adminService.getAllCategory,
  );

  const { data: config } = useQuery([QueryKey.CONFIG], async () => {
    const response = await adminService.getConfig();
    form.setFieldsValue(response);
    return response;
  });

  return (
    <div className="container mx-auto rounded-md bg-white p-5">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên Thư Viện"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên thư viện!' }]}
        >
          <Input placeholder="Nhập tên thư viện" />
        </Form.Item>

        <Form.Item
          label="Mô Tả"
          name="desc"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input.TextArea rows={4} placeholder="Nhập mô tả thư viện" />
        </Form.Item>

        <Form.Item
          label="Địa Chỉ"
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
        >
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>

        <Form.Item
          label="Điện Thoại"
          name="phone"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        {/* <Form.Item label="Chọn danh mục" name="categories">
          <Select mode="multiple" placeholder="Chọn danh mục">
            {categories &&
              categories.map((category: CategoryModel) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
          </Select>
        </Form.Item> */}

        <Form.Item label="Upload Banner" name="banners">
          <Upload>
            <Button icon={<UploadOutlined />}>Tải lên ảnh banner</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WebConfig;
