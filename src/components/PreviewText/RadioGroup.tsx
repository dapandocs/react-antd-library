import React from "react";
import { Radio, RadioGroupProps } from "antd";
import cls from "classnames";
import { PreviewTextContext, PreviewTextProps } from "./index";
import { isEmpty } from "./util";
import "./styles.less";

const PreviewRadioGroup: React.FC<RadioGroupProps & PreviewTextProps> = (
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

  const getOptions = () => {
    if (Array.isArray(props?.options) && props.options) {
      if (
        typeof props.options?.[0] === "string" ||
        typeof props.options?.[0] === "number"
      ) {
        return props.options.map((val) => ({ label: val, value: val }));
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
  };

  const findLabel: any = (value: any, dataSource: any[]) => {
    for (let i = 0; i < dataSource?.length; i++) {
      const item: any = dataSource[i];
      if (item?.value === value) {
        return item?.label;
      }
    }
  };

  const getLabels = () => {
    const selected = props.value;
    if (isEmpty(selected))
      return previewPlaceholder || contextValue?.previewPlaceholder;
    const options = getOptions();
    return (
      <span>
        {findLabel(selected, options) ||
          previewPlaceholder ||
          contextValue?.previewPlaceholder}
      </span>
    );
  };
  if (contextValue?.previewMode === "form" || previewMode === "form") {
    return <Radio.Group {...restProps} />;
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
export default PreviewRadioGroup;
