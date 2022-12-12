import React from "react";
import { Table, Tree, TreeDataNode } from "antd";
import { WrapLine } from "../../../../src";

const Text = () => {
  const str = `你好
  
  你好`;
  const string = "你好你好";
  return (
    <div>
      <WrapLine text={str} reg={/你/gi} />
      <WrapLine text={string} />
    </div>
  );
};
export default Text;
