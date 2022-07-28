import React, { useContext } from 'react';
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
import styles from './styles.less';

const PreviewInput: React.FC<InputProps & PreviewTextProps> = (props) => {
    const {
        mode,
        previewPlaceholder,
        className,
        style,
        ...restProps
    } = props;
    const contextValue = useContext(PreviewTextContext);
    if (contextValue?.mode === "form" || mode === "form") {
        return <Input {...restProps} />;
    }
    return (
        <div className={cls(styles["ant-preview-font"], className)} style={style}>
            <span>{props.addonBefore}</span>
            <span>{props.prefix}</span>
            <span>{usePlaceholder(props, (previewPlaceholder || contextValue?.previewPlaceholder))}</span>
            <span>{props.suffix}</span>
            <span>{props.addonAfter}</span>
        </div>
    );
};
export default PreviewInput;