---
  title: PreviewText 表单阅读态
  order: 1
---

# PreviewText 表单阅读态

>PreviewText 表单阅读态，主要是实现Input、Select、Tree等组件表单态与其阅读态互相切换。

## 代码演示

### PreviewText.Input

```tsx
/**
 * title: PreviewText.Input
 * transform: true
 * desc: PreviewText.Input 和 [Antd Input](https://ant-design.antgroup.com/components/input-cn/)用法完全一致，可以使用Antd Input组件的所有API。
 */
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { PreviewText } from '@react-spy/antd';

const { Input } = PreviewText;

export default () => {

    const [isPreviewText, setIsPreviewText] = useState(false);

    return (
        <Space direction="vertical" >
            <Input
                value="Hello World!"
                allowClear
                previewMode={isPreviewText ? "text" : "form"}
            />
            <Button onClick={() => setIsPreviewText(!isPreviewText)}>切换</Button>
        </Space>
    );
};
```

### PreviewText.InputNumber

```tsx
/**
 * title: PreviewText.InputNumber
 * transform: true
 * desc: PreviewText.InputNumber 和 [Antd InputNumber](https://ant-design.antgroup.com/components/input-number-cn/)用法完全一致，可以使用Antd InputNumber组件的所有API。
 */
import React, { useState, useEffect } from 'react';
import { Button, Space, Form, message } from 'antd';
import { PreviewText } from '@react-spy/antd';

const { InputNumber } = PreviewText;

export default () => {

    const [isPreviewText, setIsPreviewText] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            age: 28,
            money: 10000,
        });
    }, []);

    return (
        <PreviewText previewMode={isPreviewText ? "text" : "form"}>
            <Form form={form}>
                <Form.Item
                    label="年龄"
                    name="age"
                >
                    <InputNumber
                        placeholder="请输入"
                        style={{ width: "100%" }}
                        previewPlaceholder="我是自定义"
                    />
                </Form.Item>
                <Form.Item
                    label="薪资"
                    name="money"
                >
                    <InputNumber
                        placeholder="请输入"
                        style={{ width: "100%" }}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
                <Space>
                    <Button onClick={() => setIsPreviewText(!isPreviewText)} type="dashed">切换</Button>
                    <Button onClick={() => form.resetFields()}>重置</Button>
                    <Button
                        type="primary"
                        onClick={async () => {
                            const { age, money } = await form.validateFields();
                            if (age && money) {
                                message.success(`我年龄 ${age} 岁了，薪资 ${money} 美元`);
                            }
                        }}
                    >
                        查询
                    </Button>
                </Space>
            </Form>
        </PreviewText>
    );
};
```

### PreviewText.Cascader

```tsx
/**
 * title: PreviewText.Cascader
 * transform: true
 * desc: PreviewText.Cascader 和 [Antd Cascader](https://ant-design.antgroup.com/components/cascader-cn/)用法完全一致，可以使用Antd Cascader组件的所有API。
 */
import React, { useState, useEffect } from 'react';
import { Button, Space, Form, message } from 'antd';
import { PreviewText } from '@react-spy/antd';

const { Cascader } = PreviewText;

const options = [
    {
        value: 'zhejiang',
        label: '浙江',
        children: [
            {
                value: 'hangzhou',
                label: '杭州',
            },
        ],
    },
    {
        value: 'jiangsu',
        label: '江苏',
        children: [
            {
                value: 'nanjing',
                label: '南京',
            },
        ],
    },
];

export default () => {

    const [isPreviewText, setIsPreviewText] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            city: [
                'zhejiang',
                'hangzhou',
            ]
        });
    }, []);

    return (
        <PreviewText previewMode={isPreviewText ? "text" : "form"}>
            <Form form={form}>
                <Form.Item
                    label="城市"
                    name="city"
                >
                    <Cascader
                        allowClear
                        placeholder="请选择"
                        options={options}
                    />
                </Form.Item>
                <Space>
                    <Button onClick={() => setIsPreviewText(!isPreviewText)} type="dashed">切换</Button>
                    <Button onClick={() => form.resetFields()}>重置</Button>
                    <Button
                        type="primary"
                        onClick={async () => {
                            const { city } = await form.validateFields();
                            message.success(`选择的城市是：${city}`);
                        }}
                    >
                        查询
                    </Button>
                </Space>
            </Form>
        </PreviewText >
    );
};
```

### PreviewText.Select

```tsx
/**
 * title: PreviewText.Select
 * transform: true
 * desc: PreviewText.Select 和 [Antd Select](https://ant-design.antgroup.com/components/select-cn/)用法完全一致，可以使用Antd Select组件的所有API。
 */
import React, { useState, useEffect } from 'react';
import { Button, Space, Form, message } from 'antd';
import { PreviewText } from '@react-spy/antd';

const { Select } = PreviewText;

export default () => {

    const [isPreviewText, setIsPreviewText] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            sex: { label: "男", value: "male" },
            likes: [{ label: "看书", value: "0" }, { label: "跑步", value: "1" }],
        });
    }, []);

    return (
        <PreviewText previewMode={isPreviewText ? "text" : "form"}>
            <Form form={form}>
                <Form.Item
                    label="性别"
                    name="sex"
                >
                    <Select
                        allowClear
                        style={{ width: 300 }}
                        placeholder="请选择"
                        labelInValue
                    >
                        <Select.Option value="male">男</Select.Option>
                        <Select.Option value="female">女</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="个人喜好"
                    name="likes"
                >
                    <Select
                        allowClear
                        mode="multiple"
                        style={{ width: 300 }}
                        placeholder="请选择"
                        labelInValue
                    >
                        <Select.Option value="0">看书</Select.Option>
                        <Select.Option value="1">跑步</Select.Option>
                        <Select.Option value="2">打豆豆</Select.Option>
                    </Select>
                </Form.Item>
                <Space>
                    <Button onClick={() => setIsPreviewText(!isPreviewText)} type="dashed">切换</Button>
                    <Button onClick={() => form.resetFields()}>重置</Button>
                    <Button
                        type="primary"
                        onClick={async () => {
                            const { sex, likes } = await form.validateFields();
                            if (sex && likes) {
                                message.success(`我性别 ${sex.label}，喜欢 ${likes.map((i: { label: string; }) => i.label).join("、")}`);
                            }
                        }}
                    >
                        查询
                    </Button>
                </Space>
            </Form>
        </PreviewText>
    );
};
```

### PreviewText.TreeSelect

```tsx
/**
 * title: PreviewText.TreeSelect
 * transform: true
 * desc: PreviewText.TreeSelect 和 [Antd TreeSelect](https://ant-design.antgroup.com/components/tree-select-cn/)用法完全一致，可以使用Antd TreeSelect组件的所有API。
 */
import React, { useState, useEffect } from 'react';
import { Button, Space, Form, message } from 'antd';
import { PreviewText } from '@react-spy/antd';

const { TreeSelect } = PreviewText;

export default () => {

    const [isPreviewText, setIsPreviewText] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            type: {
                label: "苹果",
                value: "苹果"
            },
            type2: [{
                label: "苹果",
                value: "苹果"
            }, {
                label: "西瓜",
                value: "西瓜"
            }],
        });
    }, []);

    return (
        <PreviewText previewMode={isPreviewText ? "text" : "form"}>
            <Form form={form}>
                <Form.Item
                    label="水果"
                    name="type"
                >
                    <TreeSelect
                        allowClear
                        placeholder="请选择"
                        treeDefaultExpandAll
                        labelInValue
                    >
                        <TreeSelect.TreeNode value="水果" title="水果">
                            <TreeSelect.TreeNode value="苹果" title="苹果" />
                            <TreeSelect.TreeNode value="西瓜" title="西瓜" />
                        </TreeSelect.TreeNode>
                    </TreeSelect>
                </Form.Item>
                <Form.Item
                    label="水果[多选]"
                    name="type2"
                >
                    <TreeSelect
                        placeholder="请选择"
                        allowClear
                        treeDefaultExpandAll
                        labelInValue
                        multiple
                        treeData={[
                            {
                                title: '水果',
                                value: '水果',
                                children: [
                                    {
                                        title: '苹果',
                                        value: '苹果',
                                    },
                                    {
                                        title: '西瓜',
                                        value: '西瓜',
                                    },
                                ],
                            }
                        ]}
                    />
                </Form.Item>
                <Space>
                    <Button onClick={() => setIsPreviewText(!isPreviewText)} type="dashed">切换</Button>
                    <Button onClick={() => form.resetFields()}>重置</Button>
                    <Button
                        type="primary"
                        onClick={async () => {
                            const { type, type2 } = await form.validateFields();
                            message.success(`水果: ${type.label} ------- 水果[多选]: ${type2.map((item: any) => item.label).join(",")}`);
                        }}
                    >
                        查询
                    </Button>
                </Space>
            </Form>
        </PreviewText >
    );
};
```

### PreviewText.Checkbox

```tsx
/**
 * title: PreviewText.Checkbox 、 PreviewText.CheckboxGroup
 * transform: true
 * desc: PreviewText.Checkbox 和 [Antd Checkbox](https://ant-design.antgroup.com/components/checkbox-cn/)用法完全一致，可以使用Antd Checkbox组件的所有API。
 */
import React, { useState, useEffect } from 'react';
import { Button, Space, Form, message } from 'antd';
import { PreviewText } from '@react-spy/antd';

const { Checkbox, CheckboxGroup } = PreviewText;

export default () => {

    const [isPreviewText, setIsPreviewText] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            skills: ["0", "1"],
            likes: ["0"],
        });
    }, []);

    return (
        <PreviewText previewMode={isPreviewText ? "text" : "form"}>
            <Form form={form}>
                <Form.Item
                    label="技能"
                    name="skills"
                >
                    <CheckboxGroup>
                        <Checkbox value="0">会做饭</Checkbox>
                        <Checkbox value="1">会开车</Checkbox>
                        <Checkbox value="2">会打篮球</Checkbox>
                    </CheckboxGroup>
                </Form.Item>
                <Form.Item
                    label="个人喜好"
                    name="likes"
                >
                    <CheckboxGroup
                        options={[
                            {
                                label: "看书",
                                value: "0",
                            },
                            {
                                label: "跑步",
                                value: "1",
                            },
                            {
                                label: "打豆豆",
                                value: "2",
                            }
                        ]}
                    />
                </Form.Item>
                <Space>
                    <Button onClick={() => setIsPreviewText(!isPreviewText)} type="dashed">切换</Button>
                    <Button onClick={() => form.resetFields()}>重置</Button>
                    <Button
                        type="primary"
                        onClick={async () => {
                            const { skills, likes } = await form.validateFields();
                            message.success(`技能：${skills.join(",")} --------- 喜好：${likes.join(",")}`);
                        }}
                    >
                        查询
                    </Button>
                </Space>
            </Form>
        </PreviewText>
    );
};
```

### PreviewText.Radio

```tsx
/**
 * title: PreviewText.Radio 、 PreviewText.RadioGroup
 * transform: true
 * desc: PreviewText.Radio 和 [Antd Radio](https://ant-design.antgroup.com/components/radio-cn/)用法完全一致，可以使用Antd Radio组件的所有API。
 */
import React, { useState, useEffect } from 'react';
import { Button, Space, Form, message } from 'antd';
import { PreviewText } from '@react-spy/antd';

const { Radio, RadioGroup } = PreviewText;

export default () => {

    const [isPreviewText, setIsPreviewText] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            skills: "0",
            likes: "0",
        });
    }, []);

    return (
        <PreviewText previewMode={isPreviewText ? "text" : "form"}>
            <Form form={form}>
                <Form.Item
                    label="技能"
                    name="skills"
                >
                    <RadioGroup>
                        <Radio value="0">会做饭</Radio>
                        <Radio value="1">会开车</Radio>
                        <Radio value="2">会打篮球</Radio>
                    </RadioGroup>
                </Form.Item>
                <Form.Item
                    label="个人喜好"
                    name="likes"
                >
                    <RadioGroup
                        options={[
                            {
                                label: "看书",
                                value: "0",
                            },
                            {
                                label: "跑步",
                                value: "1",
                            },
                            {
                                label: "打豆豆",
                                value: "2",
                            }
                        ]}
                    />
                </Form.Item>
                <Space>
                    <Button onClick={() => setIsPreviewText(!isPreviewText)} type="dashed">切换</Button>
                    <Button onClick={() => form.resetFields()}>重置</Button>
                    <Button
                        type="primary"
                        onClick={async () => {
                            const { skills, likes } = await form.validateFields();
                            message.success(`技能：${skills} --------- 喜好：${likes}`);
                        }}
                    >
                        查询
                    </Button>
                </Space>
            </Form>
        </PreviewText>
    );
};
```

### PreviewText.DatePicker

```tsx
/**
 * title: PreviewText.DatePicker 、 PreviewText.RangePicker
 * transform: true
 * desc: PreviewText.DatePicker 和 [Antd DatePicker](https://ant-design.antgroup.com/components/date-picker-cn/)用法完全一致，可以使用Antd DatePicker组件的所有API。
 */
import React, { useState, useEffect } from 'react';
import { Button, Space, Form, message } from 'antd';
import moment from 'moment';
import { PreviewText } from '@react-spy/antd';

const { DatePicker, DateRangePicker } = PreviewText;

export default () => {

    const [isPreviewText, setIsPreviewText] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            date: moment('2020-01-01'),
            ranageDate: [moment('2020-01-01'), moment('2020-01-02')],
            year: moment('2020'),
        });
    }, []);

    return (
        <PreviewText previewMode={isPreviewText ? "text" : "form"}>
            <Form form={form}>
                <Form.Item
                    label="日期"
                    name="date"
                >
                    <DatePicker placeholder='请选择' />
                </Form.Item>
                <Form.Item
                    label="年份"
                    name="year"
                >
                    <DatePicker
                        picker='year'
                        placeholder='请选择'
                    />
                </Form.Item>
                <Form.Item
                    label="日期周期"
                    name="ranageDate"
                >
                    <DateRangePicker placeholder={["开始日期", "结束日期"]} />
                </Form.Item>
                <Space>
                    <Button onClick={() => setIsPreviewText(!isPreviewText)} type="dashed">切换</Button>
                    <Button onClick={() => form.resetFields()}>重置</Button>
                    <Button
                        type="primary"
                        onClick={async () => {
                            const { date, year, ranageDate } = await form.validateFields();
                            if (date && year && ranageDate) {
                                const format = "YYYY-MM-DD";
                                message.success(`日期: ${moment(date).format(format)} 
                                年份: ${moment(year).format("YYYY")} 日期周期: ${moment(ranageDate[0]).format(format)} ~ ${moment(ranageDate[1]).format(format)}`);
                            }
                        }}
                    >
                        查询
                    </Button>
                </Space>
            </Form>
        </PreviewText>
    );
};
```

### PreviewText.TimePicker

```tsx
/**
 * title: PreviewText.TimePicker 、 PreviewText.TimeRangePicker
 * transform: true
 * desc: PreviewText.TimePicker 和 [Antd TimePicker](https://ant-design.antgroup.com/components/time-picker-cn/)用法完全一致，可以使用Antd TimePicker组件的所有API。
 */
import React, { useState, useEffect } from 'react';
import { Button, Space, Form, message } from 'antd';
import moment from 'moment';
import { PreviewText } from '@react-spy/antd';

const { TimePicker, TimeRangePicker } = PreviewText;

export default () => {

    const [isPreviewText, setIsPreviewText] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            time: moment('12:00:00', 'HH:mm:ss'),
            ranageTime: [moment('12:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
        });
    }, []);

    return (
        <PreviewText previewMode={isPreviewText ? "text" : "form"}>
            <Form form={form}>
                <Form.Item
                    label="时间"
                    name="time"
                >
                    <TimePicker placeholder='请选择' />
                </Form.Item>
                <Form.Item
                    label="时间周期"
                    name="ranageTime"
                >
                    <TimeRangePicker placeholder={["请选择开始时间", "请选择结束时间"]} />
                </Form.Item>
                <Space>
                    <Button onClick={() => setIsPreviewText(!isPreviewText)} type="dashed">切换</Button>
                    <Button onClick={() => form.resetFields()}>重置</Button>
                    <Button
                        type="primary"
                        onClick={async () => {
                            const { time, ranageTime } = await form.validateFields();
                            if (time && ranageTime) {
                                const format = "HH:mm:ss";
                                message.success(`时间: ${moment(time).format(format)} 时间周期: ${moment(ranageTime[0]).format(format)} ~ ${moment(ranageTime[1]).format(format)}`);
                            }
                        }}
                    >
                        查询
                    </Button>
                </Space>
            </Form>
        </PreviewText>
    );
};
```

## API

### PreviewText

| 参数               | 说明                   | 类型              | 默认值 |
| ------------------ | ---------------------- | ----------------- | ------ |
| previewPlaceholder | 预览值为空时显示       | string            | N/A    |
| previewMode        | 预览的模式             | `text` \| `form ` | form   |
| previewClassName   | 预览样式className 属性 | string            | -      |
| previewStyle       | 预览样式style 属性     | string            | -      |