/**
 * 选择组件
 * @description Select + Transfer + Modal 组合
 */
import React from 'react';
import { Modal, Select, Button } from 'antd';
import { AntdTransfer } from '../AntdTransfer';
import { useSetState } from 'ahooks';

export const SelectTransfer = () => {
    const [state, setState] = useSetState({
        visible: false,
    });
    const { visible } = state;
    return (
        <>
            <Select>
                <Select.Option value="1">测试1</Select.Option>
            </Select>
            <Button onClick={() => setState({ visible: true })}>测试</Button>
            <Modal
                title="选择"
                visible={visible}
                width={800}
                destroyOnClose
                onCancel={() => setState({ visible: false })}
            >
                <AntdTransfer
                    idKey='id'
                    nameKey='name'
                    dataSource={[
                        { id: '1', name: '测试1' },
                        { id: '2', name: '测试2' },
                        { id: '3', name: '测试3' },
                    ]}
                    // targetKeys={["1"]}
                    selectedList={[ { id: '1', name: '测试1' },]}
                    limitMaxCount={1}
                />
            </Modal>
        </>
    );
};