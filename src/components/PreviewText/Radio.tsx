import React from "react";
import { Radio, RadioProps } from "antd";
import cls from "classnames";
import { PreviewTextContext, PreviewTextProps } from "./index";
import "./styles.less";

const PreviewRadio: React.FC<RadioProps & PreviewTextProps> = (props) => {
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
    return <Radio {...restProps} />;
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
      {props.children}
    </div>
  );
};
export default PreviewRadio;
