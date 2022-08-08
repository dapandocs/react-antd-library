import React from 'react';
import {
    Input,
    InputProps,
} from 'antd';
import cls from 'classnames';
import {
    PreviewTextContext,
    PreviewTextProps,
    usePlaceholder,
} from './index';
import './styles.less';

const PreviewInput: React.FC<InputProps & PreviewTextProps> = (props) => {
    const {
        previewMode,
        previewPlaceholder,
        previewClassName,
        previewStyle,
        ...restProps
    } = props;
    const contextValue = React.useContext(PreviewTextContext);
    if (contextValue?.previewMode === "form" || previewMode === "form") {
        return <Input {...restProps} />;
    }
    return (
        <div
            className={cls("ant-preview-container", contextValue?.previewClassName, previewClassName)}
            style={previewStyle || contextValue?.previewStyle}
        >
            <span>{props.addonBefore}</span>
            <span>{props.prefix}</span>
            <span>{usePlaceholder(props.value, (previewPlaceholder || contextValue?.previewPlaceholder))}</span>
            <span>{props.suffix}</span>
            <span>{props.addonAfter}</span>
        </div>
    );
};
export default PreviewInput;