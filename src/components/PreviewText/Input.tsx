import React from "react";
import { Input, InputProps } from "antd";
import cls from "classnames";
import { PreviewTextContext, PreviewTextProps, usePlaceholder } from "./index";
import "./styles.less";

const PreviewInput: React.FC<InputProps & PreviewTextProps> = (props) => {
  const {
    previewMode,
    previewPlaceholder,
    previewClassName,
    previewStyle,
    ...restProps
  } = props;
  const contextValue: Record<string, any> =
    React.useContext(PreviewTextContext);
  if (contextValue?.previewMode === "form" || previewMode === "form") {
    return <Input {...restProps} />;
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
      {props.addonBefore && <span>{props.addonBefore}</span>}
      {props.prefix && <span>{props.prefix}</span>}
      <span>
        {usePlaceholder(
          props.value,
          previewPlaceholder || contextValue?.previewPlaceholder
        )}
      </span>
      {props.suffix && <span>{props.suffix}</span>}
      {props.addonAfter && <span>{props.addonAfter}</span>}
    </div>
  );
};
export default PreviewInput;
