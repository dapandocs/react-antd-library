import React from 'react';
import { uniqBy } from 'lodash';
import { Transfer, TransferProps } from 'antd';
import { useSetState, useControllableValue, useDeepCompareEffect } from 'ahooks';

export interface AntdTransferProps {
    idKey?: string; // 穿梭框对应对应的id名称
    nameKey?: string; // 穿梭框对应的name名称

    dataSource: Array<TransferItem>; // 穿梭框左侧的总数据
    value?: string[]; // 穿梭框右侧对应的id集合

    limitMaxCount?: number; // 允许最多选取的个数，0 代表不限制

    onChange?: (targetKeys: string[]) => void; // 外部控制穿梭框右侧的id集合

    getTargetList?: (keys: any[], list: any[]) => void; // 获取右侧数据的函数

    antdProps?: TransferProps<any>, // antd组件的属性
}

export interface TransferItem {
    key?: string;
    title?: string;
    description?: string;
    disabled?: boolean;
    [name: string]: any;
}

interface ItemProps {
    [key: string]: any; // 定义对象的下标为string类型
}

export const AntdTransfer: React.FC<AntdTransferProps> = props => {
    const {
        idKey = 'key',
        nameKey = 'title',
        limitMaxCount = 0,
        dataSource = [],
        value = [],
        getTargetList,
        antdProps = {},
    } = props;

    const [state, setState] = useSetState<any>({
        list: [],
    });
    const { list } = state;

    const [tKeys, setTKeys] = useControllableValue<any>(props, {
        defaultValue: [],
    });

    useDeepCompareEffect(() => {
        if (Array.isArray(dataSource) && dataSource.length && value?.length) {
            // 得到左侧数据
            const sourceSelectedList = dataSource.filter(item => !value.includes(item[idKey]));
            // 得到可选择的个数: 减去右侧
            const canSelectCount = limitMaxCount - value.length;
            isDisabled(sourceSelectedList, canSelectCount);
        }
    }, [value]);

    /**
     * 选项在两栏之间转移时的回调函数
     * @param targetKeys 右侧的id集合
     */
    const onChange = (targetKeys: string[]) => {
        // 此时左侧的数据
        const sourceSelectedList = dataSource.filter(item => !targetKeys.includes(item[idKey]));
        // 得到可选择的个数: 减去右侧
        const canSelectCount = limitMaxCount - targetKeys.length;

        isDisabled(sourceSelectedList, canSelectCount);
        setTKeys(targetKeys);
        if (typeof getTargetList === 'function') {
            const targetList = dataSource.filter(item => targetKeys.includes(item[idKey]));
            getTargetList(targetKeys, targetList);
        }
    };

    /**
     * 穿梭框选中时执行的函数
     * @param sourceSelectedKeys 左侧选择的key
     * @param targetSelectedKeys 右侧选择的key
     */
    const onSelectChange = (
        sourceSelectedKeys: string[],
        targetSelectedKeys: string[],
    ) => {
        if (sourceSelectedKeys.length) {
            // 得到可选择的个数: 减去右侧、左侧已选择的个数
            const canSelectCount = limitMaxCount - tKeys.length - sourceSelectedKeys.length;
            // 此时左侧的数据
            const sourceSelectedList = dataSource.filter((item: ItemProps) => !tKeys.includes(item[idKey]));
            if (canSelectCount > 0 && sourceSelectedList.length >= canSelectCount) {
                sourceSelectedList.forEach((item: ItemProps) => {
                    item.disabled = false;
                });
            } else {
                // 设置disabled
                sourceSelectedList.forEach((item: ItemProps) => {
                    // 过滤掉已经选择的
                    if (!sourceSelectedKeys.includes(item[idKey])) item.disabled = true;
                });
            }
            setState({ list: uniqBy([...dataSource, ...sourceSelectedList], idKey) });
        }
    };

    /**
     * 判断是否disabled
     * @param sourList 左侧数据
     * @param canCount 可选择的个数
     * @returns 
     */
    const isDisabled = (sourList: any[], canCount: number) => {
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
        setState({ list: uniqBy([...dataSource, ...sourList], idKey) });
    };

    const onSearch = (dir: any, value: any) => {
        // console.log('search:', dir, value);
    };
    return (
        <Transfer
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
            onSearch={onSearch}
            render={(item: any) => item[nameKey]}
            // 以上属性可覆盖
            {...antdProps}
            rowKey={(item: any) => item[idKey]}
            dataSource={list}
            targetKeys={tKeys}
            onChange={onChange}
            onSelectChange={onSelectChange}
        />
    );
};