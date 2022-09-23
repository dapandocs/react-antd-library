import React from "react";
import { TimePicker, TimeRangePickerProps } from "antd";
import cls from "classnames";
import { formatMomentValue } from "./util";
import { PreviewTextContext, PreviewTextProps } from "./index";
import "./styles.less";

const PreviewTimeRangePicker: React.FC<
  TimeRangePickerProps & PreviewTextProps
> = (props) => {
  const {
    previewMode,
    previewPlaceholder,
    previewClassName,
    previewStyle,
    ...restProps
  } = props;
  const contextValue: Record<string, any> =
    React.useContext(PreviewTextContext);
  const getLabels = () => {
    const labels = formatMomentValue(
      props.value,
      props.format ? props.format : "HH:mm:ss",
      previewPlaceholder || contextValue?.previewPlaceholder
    );
    return Array.isArray(labels) ? labels.join("~") : labels;
  };
  if (contextValue?.previewMode === "form" || previewMode === "form") {
    return <TimePicker.RangePicker {...restProps} />;
  }
  return (
    <div
      className={cls(
        "ant-preview-container",
        contextValue?.previewClassName,
        previewClassName
      )}
      style={previewStyle || contextValue?.previewStyle}
    >
      {getLabels()}
    </div>
  );
};
export default PreviewTimeRangePicker;
