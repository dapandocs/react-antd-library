/**
 * 选择组件
 * @description Button + Transfer + Modal 组合
 */
import React from 'react';
import {
    Modal,
    Button,
    ButtonProps,
    ModalProps,
    TransferProps
} from 'antd';
import { useSetState, useControllableValue } from 'ahooks';
import { AntdTransfer, TransferItem } from '../AntdTransfer';

export interface ButtonTransferProps {
    idKey?: string; // 穿梭框对应对应的id名称
    nameKey?: string; // 穿梭框对应的name名称
    dataSource?: Array<TransferItem>; // 穿梭框左侧的总数据
    value?: string[]; // 穿梭框右侧对应的id集合
    onChange?: (targetKeys: string[], options: any[]) => void; // 选项在两栏之间转移时的回调函数,可以在外部通过value影响targetKeys的值
    onOkChange?: (targetKeys: string[], options: any[]) => void; // 点击确定时的回调函数
    limitMaxCount?: number; // 允许最多选取的个数，0 代表不限制
    antdButtonProps?: ButtonProps; // antd下拉框属性
    antdModalProps?: ModalProps; // antd弹窗属性
    antdTransferProps?: Omit<TransferProps<any>, "dataSource">; // antd穿梭框属性
    type?: "primary" | "auto"; // antd穿梭框操作方式
};

export const ButtonTransferModal = (props: ButtonTransferProps) => {
    const {
        idKey = 'id',
        nameKey = 'name',
        dataSource = [],
        limitMaxCount = 0,
        antdButtonProps = {},
        antdModalProps = {},
        antdTransferProps = {},
        type = 'primary',
        onOkChange,
    } = props;
    const [state, setState] = useSetState<any>({
        visible: false,
        targetLists: [], // 穿梭框右侧的list集合
    });

    const {
        visible,
        targetLists,
    } = state;

    const [targetKeys, setTargetKeys] = useControllableValue<any>(props, {
        defaultValue: []
    });

    const onOk = () => {
        setState({ visible: false });
        if (typeof onOkChange === "function") {
            onOkChange(targetKeys, targetLists);
        };
    };

    return (
        <>
            <Button
                children="点击选择"
                {...antdButtonProps}
                onClick={() => setState({ visible: true })}
            />
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
                    type={type}
                    dataSource={dataSource}
                    value={targetKeys}
                    onChange={(v: any[], options: any[]) => {
                        setTargetKeys(v, options);
                        setState({ targetLists: options });
                    }}
                    limitMaxCount={limitMaxCount}
                    antdProps={antdTransferProps}
                />
            </Modal>
        </>
    );
};