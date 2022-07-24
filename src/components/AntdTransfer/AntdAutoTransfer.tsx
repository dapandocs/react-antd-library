/**
 * 自动穿梭框
 * @description 选择后自动移入右侧
 */

import React from 'react';
import uniqBy from 'lodash/uniqBy';
import { Transfer, TransferProps } from 'antd';
import { useSetState, useControllableValue, useDeepCompareEffect } from 'ahooks';
import './AntdTransfer.less';

export interface AntdAutoTransferProps {
    idKey?: string; // 穿梭框对应对应的id名称
    nameKey?: string; // 穿梭框对应的name名称

    dataSource: Array<AntdAutoTransferItem>; // 穿梭框左侧的总数据
    value?: string[]; // 穿梭框右侧对应的id集合

    limitMaxCount?: number; // 允许最多选取的个数，0 代表不限制

    onChange?: (targetKeys: string[], options: any[]) => void; // 外部控制穿梭框右侧的id集合,人员选项发生改变时的回调函数

    antdProps?: Omit<TransferProps<any>, "dataSource">; // antd组件的属性
}

export interface AntdAutoTransferItem {
    key?: string;
    title?: string;
    description?: string;
    disabled?: boolean;
    [name: string]: any;
}

interface ItemProps {
    [key: string]: any; // 定义对象的下标为string类型
}

export const AntdAutoTransfer: React.FC<AntdAutoTransferProps> = props => {
    const {
        idKey = 'key',
        nameKey = 'title',
        limitMaxCount = 0,
        dataSource = [],
        value = [],
        antdProps = {},
    } = props;

    const [state = [], setState] = useSetState<any>({
        list: [],
    });
    const { list } = state;

    const [tKeys, setTKeys] = useControllableValue<any>(props, {
        defaultValue: [],
    });

    useDeepCompareEffect(() => {
        if (Array.isArray(dataSource) && dataSource.length && value?.length && limitMaxCount) {
            // 得到左侧数据
            const sourceSelectedList = dataSource.filter(item => !value.includes(item[idKey]));
            // 得到可选择的个数: 减去右侧
            const canSelectCount = limitMaxCount - value.length;
            isDisabled(sourceSelectedList, canSelectCount, value);
        } else {
            setState({ list: [...dataSource] });
        }
    }, [value]);


    /**
     * 穿梭框选中时执行的函数
     * @param sourceSelectedKeys 左侧选择的key
     * @param targetSelectedKeys 右侧选择的key
     */
    const onSelectChange = (
        sourceSelectedKeys: string[],
        targetSelectedKeys: string[],
    ) => {
        if (limitMaxCount) {
            // 如果限制个数
            if (sourceSelectedKeys.length === 1) {
                const canSelectCount = limitMaxCount - tKeys.length - sourceSelectedKeys.length;
                // 此时左侧的数据
                const sourceSelectedList = dataSource.filter((item: ItemProps) => {
                    return !([...tKeys, ...sourceSelectedKeys].includes(item[idKey]));
                });
                isDisabled(sourceSelectedList, canSelectCount, [...tKeys, ...sourceSelectedKeys]);
            }

            if (targetSelectedKeys.length === 1) {
                // 得到可选择的个数: 减去右侧的个数，加上右侧点击的个数（也就是1）
                const canSelectCount = limitMaxCount - tKeys.length + targetSelectedKeys.length;
                // 此时左侧的数据：先在tKeys过滤掉此时点击的选项，然后取右侧数据并取反，就是左侧数据
                const sourceSelectedList = dataSource.filter((item: ItemProps) => {
                    return !tKeys.filter((i: string) => !tKeys.includes(i)).includes(item[idKey]);
                });

                const newTKeys = tKeys.filter((i: string) => !targetSelectedKeys.includes(i));
                isDisabled(sourceSelectedList, canSelectCount, newTKeys);
            }

        } else {
            if (sourceSelectedKeys.length === 1) {
                setTKeys([...tKeys, ...sourceSelectedKeys]);
            }
            if (targetSelectedKeys.length === 1) {
                const newTKeys = tKeys.filter((i: string) => !targetSelectedKeys.includes(i));
                setTKeys(newTKeys);
            }
        }
    };

    /**
     * 判断是否disabled
     * @param sourList 左侧数据
     * @param canCount 可选择的个数
     * @param targetKeys 新右侧的数据
     * @returns 
     */
    const isDisabled = (sourList: any[], canCount: number, targetKeys: any[]) => {
        // 设置disabled
        if (canCount > 0 && sourList.length >= canCount) {
            sourList.forEach((item: ItemProps) => {
                item.disabled = false;
            });
        } else {
            // 设置disabled
            sourList.forEach((item: ItemProps) => {
                item.disabled = true;
            });
        }
        const targetList = dataSource.filter(item => targetKeys.includes(item[idKey]));
        setTKeys(targetKeys, targetList);
        setState({ list: uniqBy([...dataSource, ...sourList], idKey) });
    };

    return (
        <Transfer
            className="ant-transfer-center"
            showSearch
            listStyle={{
                width: '45%',
                height: 300,
            }}
            locale={{
                itemUnit: '位员工',
                itemsUnit: '位员工',
                searchPlaceholder: '请输入员工姓名',
            }}
            showSelectAll={false}
            titles={['待选区', '已选区']}
            render={(item: any) => item[nameKey]}
            // 以上属性可覆盖
            {...antdProps}
            rowKey={(item: any) => item[idKey]}
            dataSource={list}
            targetKeys={tKeys}
            selectedKeys={[]}
            onSelectChange={onSelectChange}
        />
    );
};