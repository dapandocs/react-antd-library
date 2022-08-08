---
  title: AntdUpload 上传
  nav:
    title: 组件
    order: 0
---

# AntdUpload 上传

> 上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

## 代码演示

### 按钮上传

```tsx
/**
 * title: 按钮上传
 * transform: true
 * desc: 经典款式，用户点击按钮弹出文件选择框。
 */
import React from 'react';
import { ButtonUpload } from "@react-spy/antd";

export default () => {
  return (
    <ButtonUpload />
  );
};
```

### 更改按钮组件[Button]属性

```tsx
/**
 * title: 更改按钮组件属性
 * transform: true
 * desc: 可以使用Antd Button组件的所有属性。
 */
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { ButtonUpload } from "@react-spy/antd";

export default () => {
  return (
    <ButtonUpload
        antdButtonProps={{
          children: <span><UploadOutlined /> 上传附件</span>,
          type: "primary"
        }}
    />
  );
};
```

### 更改上传组件[Upload]属性

```tsx
/**
 * title: 更改上传属性
 * transform: true
 * desc: 可以使用Antd Upload组件的所有属性。
 */
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { ButtonUpload } from "@react-spy/antd";

export default () => {
  return (
    <ButtonUpload
        antdUploadProps={{
            listType: "text", 
            showUploadList: {
              showDownloadIcon: false,
              showRemoveIcon: false,
            },     
       }}
    />
  );
};
```

### 自定义上传按钮组件

```tsx
/**
 * title: 自定义上传按钮组件
 * transform: true
 * desc: 可以根据业务需要扩展组件。
 */
import React from 'react';
import { ButtonUpload } from "@react-spy/antd";
import "./AntdUpload.md.less";

export default () => {
  return (
    <ButtonUpload
       uploadButtonRender={
          <div className='button'>
              <div className="button__content">Hover me and Click me</div>
          </div>
       }
    />
  );
};
```

### 仅支持下载

```tsx
/**
 * title: 仅支持下载
 * transform: true
 * desc: 通过isShowUploadEntry属性控制是否显示上传按钮,默认为true。
 */
import React from 'react';
import { message } from 'antd';
import { ButtonUpload } from '@react-spy/antd';

const fileList = [
    {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '2',
        name: 'yyy.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '3',
        name: 'zzz.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
];

export default () => {
    return (
        <ButtonUpload
            value={fileList}
            isShowUploadEntry={false}
            antdUploadProps={{
                showUploadList: {
                    showDownloadIcon: true,
                    showRemoveIcon: false,
                },
                onDownload: (file) => {
                    const { name } = file;
                    message.success(`您点击了${name}的下载按钮`);
                }
            }}
        />
    );
};
```

### 限制上传文件的格式

```tsx
/**
 * title: 限制上传文件的格式
 * transform: true
 * desc: 通过acceptUploadType属性限制限制上传文件大小,默认为 [ ]，不限制。
 */
import React from 'react';
import { ButtonUpload } from '@react-spy/antd';

export default () => {
    return (
        <ButtonUpload
            acceptUploadType={["png"]}
            antdButtonProps={{
                children: "上传附件（仅支持png图片）",
                type: "dashed",
            }}
        />
    );
};
```

### 限制上传大小

```tsx
/**
 * title: 限制上传大小
 * transform: true
 * desc: 通过limitMaxSize属性限制限制上传文件大小,默认为 0，不限制。
 */
import React from 'react';
import { ButtonUpload } from '@react-spy/antd';

export default () => {

    return (
        <ButtonUpload
            limitMaxSize={1}
            antdButtonProps={{
                children: "上传附件（Max：1MB）",
                type: "dashed",
            }}
        />
    );
};
```

### 限制上传数量

```tsx
/**
 * title: 限制上传数量
 * transform: true
 * desc: 通过limitMaxCount属性限制上传数量,默认为 0，不限制。
 */
import React from 'react';
import { ButtonUpload } from '@react-spy/antd';

const fList = [
    {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
];

export default () => {

    const [fileList, setFileList] = React.useState(fList);

    // 文件发生改变后的回调函数
    const onChange = (fileList: any) => {
        setFileList(fileList);
    };

    return (
        <ButtonUpload
            value={fileList}
            // 限制上传文件个数
            limitMaxCount={2}
            antdButtonProps={{
                children: "上传附件（Max：2）",
                type: "dashed",
            }}
            onChange={onChange}
        />
    );
};
```

### 配合Form表单使用

```tsx
/**
 * title: 配合Form表单使用
 * transform: true
 * desc:  配合Form组件，轻松收集、修改附件数据，可同Input、Select组件一样将其看成表单。
 */
import React from 'react';
import { Form, Space, Button, message } from 'antd';
import { ButtonUpload } from '@react-spy/antd';

const fileList = [
    {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '2',
        name: 'yyy.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '3',
        name: 'zzz.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
];

export default () => {

    const [form] = Form.useForm();

    React.useEffect(() => {
        form.setFieldsValue({ file: fileList });
    }, []);

    return (
        <Form
            layout="vertical"
            form={form}
        >
            <Form.Item name="file" label="附件">
                <ButtonUpload
                    antdButtonProps={{
                        children: "上传附件",
                        type: "dashed",
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button
                        type="primary"
                        onClick={async () => {
                            const values = await form.validateFields();
                            message.success("数据已打印到控制台");
                            console.log(values);
                        }}
                    >
                        提交
                    </Button>
                    <Button onClick={() => form.resetFields()}>重置</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
```

## API

### ButtonUpload

| 参数               | 说明                 | 类型                                                                     | 默认值 |
| ------------------ | -------------------- | ------------------------------------------------------------------------ | ------ |
| acceptUploadType   | 限制上传格式         | string[]                                                                 | [ ]    |
| value              | 附件列表             | Array<{}>                                                                | [ ]    |
| limitMaxCount      | 限制上传个数         | number                                                                   | 0      |
| limitMaxSize       | 限制上传单个文件大小 | number                                                                   | 0      |
| isShowUploadEntry  | 是否显示上传入口     | boolean                                                                  | true   |
| uploadButtonRender | 自定义上传按钮       | ReactNode                                                                |        |
| antdButtonProps    | antd Button属性      | [ButtonProps](https://ant-design.antgroup.com/components/button-cn/#API) |        |
| antdUploadProps    | antd Upload属性      | [UploadProps](https://ant-design.antgroup.com/components/upload-cn/#API) |        |
| onChange           | 附件发生改变后的回调 | (file: fileList) => void                                                 |        |
