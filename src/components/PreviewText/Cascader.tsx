import React from 'react';
import {
    Cascader,
} from 'antd';
import { CascaderProps, DefaultOptionType } from 'antd/lib/cascader'
import cls from 'classnames';
import { toArr } from './util';
import { PreviewTextContext, PreviewTextProps } from './index';
import './styles.less';

const PreviewCascader: React.FC<CascaderProps<any> & PreviewTextProps> = (props) => {
    const {
        previewMode,
        previewPlaceholder,
        previewClassName,
        previewStyle,
        ...restProps
    } = props;
    const contextValue = React.useContext(PreviewTextContext);
    const dataSource: any[] = props?.options?.length ? props.options : [];
    const findSelectedItem = (
        items: DefaultOptionType[],
        val: string | number,
    ) => {
        return items.find((item) => item.value == val);
    }
    const findSelectedItems = (
        sources: DefaultOptionType[],
        selectedValues: Array<string[] | number[]>,
    ): Array<any[]> => {
        return selectedValues.map((value) => {
            const result: Array<DefaultOptionType> = [];
            let items = sources;
            value.forEach((val) => {
                const selectedItem = findSelectedItem(items, val);
                // ??: 逻辑操作符，左侧为null或者undefined时，返回右侧的值
                result.push({
                    label: selectedItem?.label ?? '',
                    value: selectedItem?.value,
                })
                // 下次循环，更换为二级所有数据
                items = selectedItem?.children ?? [];
            })
            return result;
        })
    }
    const getSelected = () => {
        const val = toArr(props.value);
        return props.multiple ? val : [val];
    }
    const getLabels = () => {
        const selected: any = getSelected()
        const values = findSelectedItems(dataSource, selected);
        const labels = values
            .map((val: Array<DefaultOptionType>) => {
                return val.map((item) => item.label).join('/')
            })
            .join(' ');
        return labels || contextValue?.previewPlaceholder || previewPlaceholder;
    }
    if (contextValue?.previewMode === "form" || previewMode === "form") {
        return <Cascader {...restProps} />;
    }
    return (
        <div
            className={cls("ant-preview-container", contextValue?.previewClassName, previewClassName)}
            style={previewStyle || contextValue?.previewStyle}
        >
            {getLabels()}
        </div>
    );
};
export default PreviewCascader;