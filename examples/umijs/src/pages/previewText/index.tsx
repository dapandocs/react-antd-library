import React, { useEffect } from "react";
import { useSetState } from 'ahooks';
// import {
//     PreviewText
// } from '../../../../../src';
// import { PreviewText } from '../../../../../es';
import { PreviewText } from '@react-spy/antd';
import { Space, Form, Button } from 'antd';
import styles from './index.less';

const {
    Input,
    InputNumber,
    Select,
    TreeSelect,
    Cascader,
    DatePicker,
    DateRangePicker,
    TimePicker,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
} = PreviewText;

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

const PreviewTextPage = (props: any) => {

    const [state, setState] = useSetState<any>({
        previewMode: "form",
    });
    const { previewMode } = state;

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            input: "1000"
        });
    }, []);

    const plainOptions = ['Apple', 'Pear', 'Orange'];

    return (
        <div style={{ padding: "5% 15%" }}>
            <PreviewText previewMode={previewMode} previewStyle={{ color: "blue" }}>
                <Form layout="horizontal" form={form}>
                    <Form.Item label="Input输入框" name="input">
                        <Input
                            placeholder="请输入"
                            suffix="万元"
                            // previewStyle={{ color: "#eee" }}
                            previewPlaceholder="预览"
                        />
                    </Form.Item>
                    <Form.Item
                        label="InputNumber数字输入框"
                        name="inputNumber"
                        labelCol={{ span: 24 }}
                        initialValue={100}
                    >
                        <InputNumber
                            placeholder="请输入"
                            style={{ width: "100%" }}
                            previewPlaceholder="预览"
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Select下拉框"
                        name="select"
                    // initialValue={[{
                    //     label: "选项1",
                    //     value: "1"
                    // }, {
                    //     label: "选项2",
                    //     value: "2"
                    // }]}
                    >
                        <Select mode="multiple" labelInValue>
                            <Select.Option value="1">选项1</Select.Option>
                            <Select.Option value="2">选项2</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="TreeSelect下拉框"
                        name="treeSelect"
                        initialValue={{
                            label: "parent 1-0",
                            value: "parent 1-0"
                        }}
                    >
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            labelInValue
                        >
                            <TreeSelect.TreeNode value="parent 1" title="parent 1">
                                <TreeSelect.TreeNode value="parent 1-0" title="parent 1-0">
                                    <TreeSelect.TreeNode value="leaf1" title="leaf1" />
                                    <TreeSelect.TreeNode value="leaf2" title="leaf2" />
                                </TreeSelect.TreeNode>
                                <TreeSelect.TreeNode value="parent 1-1" title="parent 1-1">
                                    <TreeSelect.TreeNode value="leaf3" title={<b style={{ color: '#08c' }}>leaf3</b>} />
                                </TreeSelect.TreeNode>
                            </TreeSelect.TreeNode>
                        </TreeSelect>
                    </Form.Item>
                    <Form.Item
                        label="Cascader级联选择"
                        name="cascader"
                    >
                        <Cascader
                            options={options}
                            placeholder="Please select"
                        />
                    </Form.Item>
                    <Form.Item
                        label="DatePicker日期选择框"
                        name="datePicker"
                    >
                        <DatePicker
                            placeholder="请选择日期"
                            style={{ width: '100%' }}
                            picker="quarter"
                        />
                    </Form.Item>
                    <Form.Item
                        label="RangePicker日期选择框"
                        name="rangePicker"
                    >
                        <DateRangePicker
                            style={{ width: '100%' }}
                            picker="time"
                            use12Hours
                            format="h:mm:ss A"
                        />
                    </Form.Item>
                    <Form.Item
                        label="TimePicker时间选择框"
                        name="timePicker"
                    >
                        <TimePicker
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Checkbox多选框"
                        name="checkbox"
                        initialValue={["Apple"]}
                    >
                        {/* <Checkbox value="A">A</Checkbox> */}
                        {/* <CheckboxGroup>
                            <Checkbox value="A">A</Checkbox>
                            <Checkbox value="B">B</Checkbox>
                            <Checkbox value="C">C</Checkbox>
                        </CheckboxGroup> */}
                        <CheckboxGroup options={plainOptions} />
                    </Form.Item>
                    <Form.Item
                        label="Radio单选框"
                        name="radio"
                    // initialValue={["A"]}
                    >
                        {/* <RadioGroup>
                            <Radio value="A">A</Radio>
                            <Radio value="B">B</Radio>
                            <Radio value="C">C</Radio>
                        </RadioGroup> */}
                        <RadioGroup options={plainOptions} />
                    </Form.Item>
                </Form>
            </PreviewText>
            <Space>
                <Button
                    onClick={async () => {
                        const values = await form.validateFields();
                        console.log("values", values);
                    }}
                >
                    提交
                </Button>
                <Button
                    onClick={() => setState({ previewMode: previewMode === "form" ? "text" : "form" })}
                >
                    切换
                </Button>
            </Space>

        </div>
    );
};
export default PreviewTextPage;