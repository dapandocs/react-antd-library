import React from 'react';
import {
    Select,
    SelectProps,
    Tag,
} from 'antd';
import cls from 'classnames';
import { PreviewTextContext, PreviewTextProps } from './index';
import { isValid } from './util';
import './styles.less';

// 定义Select组件的二级子组件类型
interface CompoundedComponentSelect
    extends React.ForwardRefExoticComponent<React.PropsWithChildren<SelectProps & PreviewTextProps>> {
    Option: typeof Select.Option;
    OptGroup: typeof Select.OptGroup;
}

const PSelect: React.FC<SelectProps & PreviewTextProps> = (props) => {
    const {
        previewMode,
        previewPlaceholder,
        previewClassName,
        previewStyle,
        ...restProps
    } = props;
    const contextValue = React.useContext(PreviewTextContext);
    const dataSource: any[] = props?.options?.length ? props.options : [];
    const getSelected = () => {
        const value = props.value;
        if (props.mode === 'multiple' || props.mode === 'tags') {
            if (props.labelInValue) {
                return Array.isArray(value) ? value : [];
            } else {
                return Array.isArray(value)
                    ? value.map((val) => ({ label: val, value: val }))
                    : [];
            }
        } else {
            if (props.labelInValue) {
                return isValid(value) ? [value] : [];
            } else {
                return isValid(value) ? [{ label: value, value }] : [];
            }
        }
    };

    const getLabel = (target: any) => {
        const labelKey = props.fieldNames?.label || 'label';
        return (
            dataSource?.find((item) => {
                const valueKey = props.fieldNames?.value || 'value';
                return item[valueKey] == target?.value;
            })?.[labelKey] || target.label ||
            previewPlaceholder || contextValue?.previewPlaceholder
        )
    }

    const getLabels = () => {
        const selected = getSelected();
        if (!selected.length) return previewPlaceholder || contextValue?.previewPlaceholder;
        if (selected.length === 1) return getLabel(selected[0]);
        return selected.map((item, key) => {
            return <Tag key={key}>{getLabel(item)}</Tag>;
        })
    }
    if (contextValue?.previewMode === "form" || previewMode === "form") {
        return <Select {...restProps} />;
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

const PreviewSelect = PSelect as CompoundedComponentSelect;
PreviewSelect.Option = Select.Option;
PreviewSelect.OptGroup = Select.OptGroup;

export default PreviewSelect;