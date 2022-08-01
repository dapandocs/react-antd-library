import React, { useContext } from 'react';
import {
    Checkbox,
    Tag,
} from 'antd';
import cls from 'classnames';
import { CheckboxGroupProps } from 'antd/lib/checkbox'
import {
    PreviewTextContext,
    PreviewTextProps,
} from './index';
import './styles.less';

const PreviewCheckboxGroup: React.FC<CheckboxGroupProps & PreviewTextProps> = (props) => {
    const {
        previewMode,
        previewPlaceholder,
        previewClassName,
        previewStyle,
        ...restProps
    } = props;
    const contextValue = useContext(PreviewTextContext);

    const getOptions = () => {
        if (Array.isArray(props?.options) && props.options) {
            if (typeof props.options?.[0] === "string" || typeof props.options?.[0] === "number") {
                return props.options.map(val => ({ label: val, value: val }));
            }
            return props.options;
        }
        if (Array.isArray(props?.children)) {
            const options = props.children.map((item: any) => {
                const label = item?.props?.children;
                const value = item?.props?.value;
                return { label, value };
            });
            return options;
        }
        return [];
    }

    const findLabel: any = (
        value: any,
        dataSource: any[],
    ) => {
        for (let i = 0; i < dataSource?.length; i++) {
            const item: any = dataSource[i];
            if (item?.value === value) {
                return item?.label;
            }
        }
    }

    const getLabels = () => {
        const selected = props.value;
        if (!selected?.length) return previewPlaceholder || contextValue?.previewPlaceholder;
        const options = getOptions();
        return selected.map((value: any, key: number) => {
            return (
                <Tag key={key}>
                    {
                        findLabel(value, options) ||
                        previewPlaceholder || contextValue?.previewPlaceholder
                    }
                </Tag>
            )
        })
    }
    if (contextValue?.previewMode === "form" || previewMode === "form") {
        return <Checkbox.Group {...restProps} />;
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
export default PreviewCheckboxGroup;