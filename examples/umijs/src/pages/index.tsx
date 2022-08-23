import React from 'react';
import {
  SelectTransferModal,
} from '../../../../src';
// import { SelectTransferModal } from 'react-antd-library';
import {
  Form,
  Input,
  Select,
  Button,
  Space,
} from 'antd';

const list = [
  { id: '1', name: '张三' },
  { id: '2', name: '李四' },
  { id: '3', name: '小明' },
  { id: '4', name: '小红' },
  { id: '5', name: '小兰' },
];

export default () => {

  const [form] = Form.useForm();


  return (
    <Form layout="vertical" form={form} style={{ padding: "5% 25%" }}>
      <Form.Item name="userName" label="员工姓名">
        <Input placeholder='请输入员工姓名' />
      </Form.Item>
      <Form.Item name="userSex" label="员工性格">
        <Select placeholder="请选择员工性别">
          <Select.Option value="male">男</Select.Option>
          <Select.Option value="female">女</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="manageName" label="负责人">
        <SelectTransferModal
          dataSource={list}
          limitMaxCount={3}
          type="auto"
          antdSelectProps={{
            placeholder: '请选择负责人',
            allowClear: true,
          }}
        />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            重置
          </Button>
          <Button
            type="primary"
            onClick={async () => {
              const values = await form.validateFields();
              console.log(values);
            }}
          >
            提交
          </Button>
          <Button
            type="link"
            onClick={() => {
              form.setFieldsValue({
                userName: "王强",
                userSex: "male",
                manageName: ["2","3"]
              });
            }}
          >
            填充
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}