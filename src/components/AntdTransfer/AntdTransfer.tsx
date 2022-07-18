import React, { useMemo } from 'react';
import { uniq, uniqBy } from 'lodash';
import { Transfer } from 'antd';
import { useSetState } from 'ahooks';

export interface SimpleTransferProps {
    idKey?: string; // 穿梭框对应对应的id名称
    nameKey?: string; // 穿梭框对应的name名称

    dataSource: Array<TransferItem>; // 穿梭框左侧的总数据
    targetKeys?: string[]; // 穿梭框右侧对应的id集合

    limitMaxCount?: number; // 允许最多选取的个数，0 代表不限制

    selectedList?: Array<TransferItem>; // 被选中的数据列表,格式：[{key:1,title:'测试'}]

    handleChange?: (targetKeys: string[]) => void; // 选择后的回调函数

    [x: string]: any; // 兼容antd组件默认参数传入
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

export const AntdTransfer: React.FC<SimpleTransferProps> = props => {
    const {
        idKey = 'key',
        nameKey = 'title',
        limitMaxCount = 0,
        dataSource = [],
        targetKeys = [],
        selectedList = [],
        handleChange,
    } = props;

    const [state, setState] = useSetState<any>({
        tKeys: targetKeys,
        sSelectedKeys: [],
    });

    const { tKeys, sSelectedKeys } = state;


    const newDataSource = useMemo(() => {
        const selectedListIds = selectedList.map((item: ItemProps) => item[idKey]);
        const data = uniqBy([...dataSource, ...selectedList], nameKey);

        // 处理切换部门时，limitMaxCount不生效的bug
        const bothSelectedListIds = uniq([
            ...selectedListIds,
            ...sSelectedKeys,
        ]);

        // 设置disabled
        if (limitMaxCount > 0 && bothSelectedListIds.length >= limitMaxCount) {
            data.forEach((item: ItemProps) => {
                if (bothSelectedListIds.indexOf(item[idKey]) === -1)
                    item.disabled = true;
            });
        } else {
            data.forEach((item: ItemProps) => {
                item.disabled = false;
            });
        }
        return data;
    }, [[...dataSource, ...selectedList]]);

    // 选项在两栏之间转移时的回调函数
    const onChange = (targetKeys: string[]) => {
        // 设置disabled
        if (limitMaxCount > 0 && targetKeys.length >= limitMaxCount) {
            newDataSource.forEach((item: ItemProps) => {
                if (targetKeys.indexOf(item[idKey]) === -1) item.disabled = true;
            });
        } else {
            newDataSource.forEach((item: ItemProps) => {
                item.disabled = false;
            });
        }
        setState({ tKeys: targetKeys });
        if (typeof handleChange === 'function') handleChange(targetKeys);
    };

    // 穿梭框选中时执行的函数
    const onSelectChange = (
        sourceSelectedKeys: string[],
        targetSelectedKeys: string[],
    ) => {
        // 设置disabled
        const bothList: string[] = uniq([
            ...sourceSelectedKeys,
            ...targetSelectedKeys,
        ]);
        if (limitMaxCount > 0 && bothList.length >= limitMaxCount) {
            newDataSource.forEach((item: ItemProps) => {
                if (bothList.indexOf(item[idKey]) === -1) item.disabled = true;
            });
        } else {
            newDataSource.forEach((item: ItemProps) => {
                item.disabled = false;
            });
        }
        setState({ sSelectedKeys: sourceSelectedKeys });
    };

    const onSearch = (dir: any, value: any) => {
        // console.log('search:', dir, value);
    };

    return (
        <Transfer
            rowKey={(item: any) => item[idKey]}
            dataSource={newDataSource}
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
            targetKeys={tKeys}
            onChange={onChange}
            onSearch={onSearch}
            onSelectChange={onSelectChange}
            render={(item: any) => item[nameKey]}
        />
    );
};