import { useEffect } from 'react';
import {
  SelectTransfer,
} from '../../../../src';
// import { SelectTransfer } from '@react-spy/antd';
import { useSetState } from 'ahooks';
import {
  Form,
} from 'antd';

const allData = [
  { id: '1', name: '马云' },
  { id: '2', name: '马化腾' },
  { id: '3', name: '李嘉诚' },
  { id: '4', name: '刘亦菲' },
  { id: '5', name: '赵丽颖' },
  { id: '6', name: '杨 幂' },
  { id: '7', name: '王洋' },
];

export default () => {

  const [state, setState] = useSetState({
    keys: ['1', '2'],
  });
  const { keys } = state;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ test: ["2", "3", "4"] });
  }, []);

  return (
    <Form layout="vertical" form={form}>
      <Form.Item name="test" label="测试人员">
        <SelectTransfer
          dataSource={allData}
          onChange={(v: any, p: any) => {
            setState({ keys: v });
          }}
          limitMaxCount={3}
        />
      </Form.Item>
    </Form>
  );
}