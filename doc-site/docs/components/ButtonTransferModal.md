# ButtonTransferModal 弹框式选择器

>ButtonTransferModal 弹框式选择器，主要实现在满足非表单布局的同时，又可以兼顾展示可选项的更多信息。

## 代码演示

### 基本用法

```tsx
/**
 * title: 基本用法
 * transform: true
 */
import React from 'react';
import { Tag, Space } from 'antd';
import { ButtonTransferModal } from 'react-antd-library';

const list = [
    { key: '1', title: '张三' },
    { key: '2', title: '李四' },
    { key: '3', title: '小明' },
    { key: '4', title: '小红' },
    { key: '5', title: '小兰' },
];

export default () => {
    const [selectedList, setSelectedList] = React.useState<any>([]);

    return (
        <Space direction="vertical">
            <ButtonTransferModal
                dataSource={list}
                idKey="key"
                nameKey="title"
                antdButtonProps={{
                    type: 'primary',
                    children: '选择名单',
                }}
                onOk={(v: any[], l: any[]) => setSelectedList(l)}
            />
            <div>
                {
                    selectedList.map((item: any) => {
                        return <Tag key={item.key} color="#f50">{item.title}</Tag>;
                    })
                }
            </div>
        </Space>
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