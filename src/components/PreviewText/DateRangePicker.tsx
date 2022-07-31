import React, { useContext } from 'react';
import {
    DatePicker,
} from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker'
import cls from 'classnames';
import { formatMomentValue, getFormat } from './util';
import { PreviewTextContext, PreviewTextProps } from './index';
import './styles.less';

const PreviewDateRangePicker: React.FC<RangePickerProps & PreviewTextProps> = (props) => {
    const {
        previewMode,
        previewPlaceholder,
        previewClassName,
        previewStyle,
        ...restProps
    } = props;
    const contextValue = useContext(PreviewTextContext);
    const getLabels = () => {
        const labels = formatMomentValue(
            props.value,
            getFormat(props),
            (previewPlaceholder || contextValue?.previewPlaceholder)
        );
        return Array.isArray(labels) ? labels.join('~') : labels;
    }
    if (contextValue?.previewMode === "form" || previewMode === "form") {
        return <DatePicker.RangePicker {...restProps} />;
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
export default PreviewDateRangePicker;