import React from "react";
import { TreeSelect, TreeSelectProps, Tag } from "antd";
import cls from "classnames";
import { PreviewTextContext, PreviewTextProps } from "./index";
import "./styles.less";

// 定义TreeSelect组件的二级子组件类型
interface CompoundedComponentTreeSelectProps
  extends React.ForwardRefExoticComponent<
    React.PropsWithChildren<TreeSelectProps & PreviewTextProps>
  > {
  TreeNode: typeof TreeSelect.TreeNode;
}

const PtSelect: React.FC<TreeSelectProps & PreviewTextProps> = (props) => {
  const {
    previewMode,
    previewPlaceholder,
    previewClassName,
    previewStyle,
    ...restProps
  } = props;
  const contextValue: Record<string, any> =
    React.useContext(PreviewTextContext);
  const dataSource = props?.treeData?.length ? props.treeData : [];
  const getSelected = () => {
    const value = props.value;
    if (props.multiple) {
      if (props.labelInValue) {
        return Array.isArray(value) ? value : [];
      } else {
        return Array.isArray(value)
          ? value.map((val) => ({ label: val, value: val }))
          : [];
      }
    } else {
      if (props.labelInValue) {
        return value ? [value] : [];
      } else {
        return value ? [{ label: value, value }] : [];
      }
    }
  };
  const findLabel: any = (
    value: any,
    dataSource: any[],
    treeNodeLabelProp?: any
  ) => {
    for (let i = 0; i < dataSource?.length; i++) {
      const item: any = dataSource[i];
      if (item?.value === value) {
        return item?.label ?? item[treeNodeLabelProp];
      } else {
        const childLabel = findLabel(value, item?.children, treeNodeLabelProp);
        if (childLabel) return childLabel;
      }
    }
  };

  const getLabels = () => {
    const selected = getSelected();
    if (!selected?.length)
      return previewPlaceholder || contextValue?.previewPlaceholder;
    return selected.map(({ value, label }, key) => {
      return (
        <Tag key={key}>
          {findLabel(value, dataSource, props.treeNodeLabelProp) ||
            label ||
            previewPlaceholder ||
            contextValue?.previewPlaceholder}
        </Tag>
      );
    });
  };
  if (contextValue?.previewMode === "form" || previewMode === "form") {
    return <TreeSelect {...restProps} />;
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
const PreviewTreeSelect = PtSelect as CompoundedComponentTreeSelectProps;
PreviewTreeSelect.TreeNode = TreeSelect.TreeNode;
export default PreviewTreeSelect;
