import React from "react";
import { DatePicker, DatePickerProps } from "antd";
import cls from "classnames";
import { formatMomentValue, getFormat } from "./util";
import { PreviewTextContext, PreviewTextProps } from "./index";
import "./styles.less";

const PreviewDatePicker: React.FC<DatePickerProps & PreviewTextProps> = (
  props
) => {
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
      getFormat(props),
      previewPlaceholder || contextValue?.previewPlaceholder
    );
    return Array.isArray(labels) ? labels.join("~") : labels;
  };
  if (contextValue?.previewMode === "form" || previewMode === "form") {
    return <DatePicker {...restProps} />;
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
export default PreviewDatePicker;
