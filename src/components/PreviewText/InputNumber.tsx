import React from 'react';
import {
    InputNumber,
    InputNumberProps,
} from 'antd';
import cls from 'classnames';
import {
    PreviewTextContext,
    PreviewTextProps,
    usePlaceholder,
} from './index';
import './styles.less';

const PreviewInputNumber: React.FC<InputNumberProps & PreviewTextProps> = (props) => {
    const {
        previewMode,
        previewPlaceholder,
        previewClassName,
        previewStyle,
        ...restProps
    } = props;
    const contextValue = React.useContext(PreviewTextContext);
    if (contextValue?.previewMode === "form" || previewMode === "form") {
        return <InputNumber {...restProps} />;
    }
    return (
        <div
            className={cls("ant-preview-container", contextValue?.previewClassName, previewClassName)}
            style={previewStyle || contextValue?.previewStyle}
        >
            <span>{props.addonBefore}</span>
            <span>{props.prefix}</span>
            <span>
                {usePlaceholder(
                    props.formatter
                        ? props.formatter(String(props.value ? props.value : ""), {
                            userTyping: false,
                            input: '',
                        })
                        : props.value,
                    (previewPlaceholder || contextValue?.previewPlaceholder))
                }
            </span>
            <span>{props.addonAfter}</span>
        </div>
    );
};
export default PreviewInputNumber;