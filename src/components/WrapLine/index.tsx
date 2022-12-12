import React from "react";

export type WrapLineProps = {
  text: string;
  reg?: RegExp;
};

export const WrapLine: React.FC<WrapLineProps> = ({ text, reg = /\n/gi }) => {
  if (!text || typeof text !== "string") {
    return null;
  }
  const htmlString = text.replace(reg, "<br />");
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};
