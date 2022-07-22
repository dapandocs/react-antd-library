import { useEffect } from 'react';
import {
  SelectTransferModal,
  ButtonTransferModal,
  AntdTransfer,
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

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ test: ["2", "3", "4"] });
  }, []);

  return (
    <>
      <Form layout="vertical" form={form}>
        <ButtonTransferModal
          dataSource={allData}
          onOkChange={(v, o) => {
            console.log(v, o);
          }}
          antdButtonProps={{
            children: <span>人员选择</span>,
            type: "primary"
          }}
          antdModalProps={{
            title: "人员选择"
          }}
        />
        <Form.Item name="test" label="测试人员">
          <SelectTransferModal
            dataSource={allData}
            onChange={(v: any, p: any) => {
              // setState({ keys: v });
              console.log(v, p);
            }}
            limitMaxCount={3}
            onOkChange={(v, o) => {
              console.log(v, o);
            }}
          />
        </Form.Item>
        <Form.Item name="st" label="测试人员2" initialValue={["1", "2", "3"]}>
          <AntdTransfer
            type="auto"
            idKey='id'
            nameKey='name'
            dataSource={allData}
          // limitMaxCount={3}
          />
        </Form.Item>
      </Form>
    </>

  );
}