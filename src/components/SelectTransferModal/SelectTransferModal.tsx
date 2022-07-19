/**
 * 选择组件
 * @description Select + Transfer + Modal 组合
 */
import React, { useRef, useEffect } from 'react';
import {
    Modal,
    Select,
    SelectProps,
    ModalProps,
    TransferProps
} from 'antd';
import { useSetState, useControllableValue, useDeepCompareEffect } from 'ahooks';
import { AntdTransfer, TransferItem } from '../AntdTransfer';

export interface SelectTransferModalProps {
    idKey?: string; // 穿梭框对应对应的id名称
    nameKey?: string; // 穿梭框对应的name名称
    dataSource?: Array<TransferItem>; // 穿梭框左侧的总数据
    value?: string[]; // 穿梭框右侧对应的id集合
    onChange?: (targetKeys: string[], options: any[]) => void; // 选项在两栏之间转移时的回调函数,可以在外部通过value影响targetKeys的值
    onOkChange?: (targetKeys: string[], options: any[]) => void; // 点击确定时的回调函数
    limitMaxCount?: number; // 允许最多选取的个数，0 代表不限制
    antdSelectProps?: SelectProps; // antd下拉框属性
    antdModalProps?: ModalProps; // antd弹窗属性
    antdTransferProps?: TransferProps<any>; // antd穿梭框属性
};

export const SelectTransferModal = (props: SelectTransferModalProps) => {
    const {
        idKey = 'id',
        nameKey = 'name',
        dataSource = [],
        limitMaxCount = 0,
        antdSelectProps = {},
        antdModalProps = {},
        antdTransferProps = {},
        onOkChange,
    } = props;
    const [state, setState] = useSetState<any>({
        visible: false,
        isOkConfirm: false, // 是否点击确认按钮
        isTargetKeysChange: false, // 穿梭框是否改动过
        selectedKeys: [], // 下拉框选中的id集合
        selectedLists: [], // 下拉框选中的list集合
    });

    const {
        visible,
        selectedKeys,
        selectedLists,
        isOkConfirm,
        isTargetKeysChange,
    } = state;

    const selectRef = useRef<any>();

    const [targetKeys, setTargetKeys] = useControllableValue<any>(props, {
        defaultValue: [],
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
        if (typeof onOkChange === "function") {
            onOkChange(targetKeys, selectedLists);
        };
    };

    return (
        <>
            <Select
                style={{ minWidth: 200 }}
                // removeIcon={<div />}
                placeholder="请选择"
                mode="multiple"
                {...antdSelectProps}
                // 以下属性不支持覆盖
                onChange={(value: any, options: any) => {
                    setTargetKeys(value, options);
                    setState({ selectedKeys: value });
                }}
                open={false}
                ref={selectRef}
                value={selectedKeys}
                onDropdownVisibleChange={handleOpenModal}
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
                width={700}
                okText="确定"
                cancelText="取消"
                {...antdModalProps}
                // 以下属性不支持覆盖
                destroyOnClose
                visible={visible}
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
                        setState({ isTargetKeysChange: true, selectedLists: options });
                    }}
                    limitMaxCount={limitMaxCount}
                    antdProps={antdTransferProps}
                />
            </Modal>
        </>
    );
};