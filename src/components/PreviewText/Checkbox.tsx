import React from 'react';
import {
    Checkbox,
    CheckboxProps,
} from 'antd';
import cls from 'classnames';
import {
    PreviewTextContext,
    PreviewTextProps,
} from './index';
import './styles.less';

const PreviewCheckbox: React.FC<CheckboxProps & PreviewTextProps> = (props) => {
    const {
        previewMode,
        previewPlaceholder,
        previewClassName,
        previewStyle,
        ...restProps
    } = props;
    const contextValue = React.useContext(PreviewTextContext);
    if (contextValue?.previewMode === "form" || previewMode === "form") {
        return <Checkbox {...restProps} />;
    }
    return (
        <div
            className={cls("ant-preview-container", contextValue?.previewClassName, previewClassName)}
            style={previewStyle || contextValue?.previewStyle}
        >
            {props.children}
        </div>
    );
};
export default PreviewCheckbox;