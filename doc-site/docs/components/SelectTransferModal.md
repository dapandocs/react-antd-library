# SelectTransferModal 弹框式选择器

>SelectTransferModal 弹框式选择器，主要实现在满足表单布局的同时，又可以兼顾展示可选项的更多信息。

## 代码演示

### 基本用法

```tsx
/**
 * title: 基本用法
 * transform: true
 */
import React from 'react';
import { Button, Space, Form, message } from 'antd';
import { SelectTransferModal } from 'react-antd-library';

const list = [
    { key: '1', title: '张三' },
    { key: '2', title: '李四' },
    { key: '3', title: '小明' },
    { key: '4', title: '小红' },
    { key: '5', title: '小兰' },
];

export default () => {

    const [form] = Form.useForm();

    return (
        <Form form={form}>
            <Form.Item
                label="晋级名单"
                name="personList"
            >
                <SelectTransferModal dataSource={list} />
            </Form.Item>
            <Space>
                <Button onClick={() => form.resetFields()}>重置</Button>
                <Button
                    type="primary"
                    onClick={async () => {
                        const { personList } = await form.validateFields();
                        if (Array.isArray(personList)) {
                            const personNameList = list.filter(item => personList.includes(item.key))
                                .map(item => item.title)
                                .join('，');
                            message.success(`晋级名单：${personNameList}`);
                        }
                    }}
                >
                    查询
                </Button>
            </Space>
        </Form>
    );
};
```

### 更多案例
请参照：[AntdTransfer](https://antd-react-spy.vercel.app/components/antd-transfer)

### AntdTransfer

| 参数          | 说明                                                              | 类型                                                                         | 默认值 |
| ------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------ |
| idKey         | 穿梭框对应对应的key名称                                           | string                                                                       | key    |
| nameKey       | 穿梭框对应的title名称                                             | string                                                                       | title  |
| type       | 穿梭框操作方式                                             | `auto` \| `primary`                                                                       | primary  |
| limitMaxCount | 限制上传个数                                                      | number                                                                       | 0      |
| dataSource    | 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外 | Array<{}>                                                                       | [ ]    |
| value         | 穿梭框右侧的targetKeys                                            | string[]                                                                     | [ ]    |
| onChange      | 选项在两栏之间转移时的回调函数                                    | (targetKeys: string[], options: any[])=>void                                 |        |
| onOk      | 点击确定时的回调函数                                    | (targetKeys: string[], options: any[])=>void                                 |        |
| antdSelectProps     | antd Select属性                                                 | [antdSelectProps](https://ant-design.antgroup.com/components/select-cn/#API) |        |
| antdTransferProps     | antd Transfer属性                                                 | [TransferProps](https://ant-design.antgroup.com/components/transfer-cn/#API) |        |
| antdModalProps     | antd Modal属性                                                 | [antdModalProps](https://ant-design.antgroup.com/components/modal-cn/#API) |        |