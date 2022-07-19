/**
 * 选择组件
 * @description Select + Transfer + Modal 组合
 */
import React, { useRef, useEffect } from 'react';
import { Modal, Select } from 'antd';
import { AntdTransfer, TransferItem } from '../AntdTransfer';
import { useSetState, useControllableValue, useDeepCompareEffect, useDeepCompareLayoutEffect } from 'ahooks';

export interface SelectTransferProps {
    idKey?: string; // 穿梭框对应对应的id名称
    nameKey?: string; // 穿梭框对应的name名称
    dataSource?: Array<TransferItem>; // 穿梭框左侧的总数据
    value?: string[]; // 穿梭框右侧对应的id集合
    onChange?: (targetKeys: string[], options: any[]) => void; // 外部控制穿梭框右侧的id集合
    limitMaxCount?: number; // 允许最多选取的个数，0 代表不限制
};

export const SelectTransfer = (props: SelectTransferProps) => {
    const {
        idKey = 'id',
        nameKey = 'name',
        dataSource = [],
        limitMaxCount = 0,
    } = props;
    const [state, setState] = useSetState<any>({
        visible: false,
        isOkConfirm: false, // 是否点击确认按钮
        isTargetKeysChange: false, // 穿梭框是否改动过
        selectedKeys: [], // 下拉框选中的id集合
    });

    const {
        visible,
        selectedKeys,
        isOkConfirm,
        isTargetKeysChange,
    } = state;

    const selectRef = useRef<any>();

    const [targetKeys, setTargetKeys] = useControllableValue<any>(props, {
        defaultValue: []
    });

    useDeepCompareEffect(() => {
        if (Array.isArray(targetKeys)) {
            if (isOkConfirm) {
                // 解决下拉框和穿梭框的值总是一致的问题
                setState({ selectedKeys: targetKeys });
            }
            if (!isTargetKeysChange) {
                // 解决外部数据可能改变的问题，eg:异步获取数据
                setState({ selectedKeys: targetKeys });
            }
        }
    }, [targetKeys]);

    useEffect(() => {
        // 点击确认按钮后重置状态
        if (isOkConfirm) {
            setState({ isOkConfirm: false });
        }
    }, [isOkConfirm]);

    // 打开弹窗
    const handleOpenModal = () => {
        setState({ visible: true });
        selectRef.current.blur();
    };

    const onOk = () => {
        setState({
            visible: false,
            selectedKeys: targetKeys,
            isOkConfirm: true
        });
    }

    return (
        <>
            <Select
                style={{ minWidth: 200 }}
                removeIcon={<div></div>}
                placeholder="请选择"
                open={false}
                ref={selectRef}
                mode="multiple"
                value={selectedKeys}
                onFocus={handleOpenModal}
            >
                {dataSource.map((item: any) => {
                    return (
                        <Select.Option key={item[idKey]} value={item[idKey]}>
                            {item[nameKey]}
                        </Select.Option>
                    );
                })}
            </Select>
            <Modal
                title="请选择"
                visible={visible}
                width={700}
                okText="确定"
                cancelText="取消"
                destroyOnClose
                onCancel={() => setState({ visible: false })}
                onOk={onOk}
            >
                <AntdTransfer
                    idKey={idKey}
                    nameKey={nameKey}
                    dataSource={dataSource}
                    value={targetKeys}
                    onChange={(v: any[], options: any[]) => {
                        setTargetKeys(v, options);
                        setState({ isTargetKeysChange: true });
                    }}
                    limitMaxCount={limitMaxCount}
                />
            </Modal>
        </>
    );
};