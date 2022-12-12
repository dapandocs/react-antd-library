/**
 * 按钮--上传
 * @description 按钮形式的上传，可以自定义上传按钮的样式
 */

import React from "react";
import { Upload, UploadProps, ButtonProps, Button, message } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { useControllableValue } from "ahooks";

export interface ButtonUploadProps {
  limitMaxCount?: number; // 允许最多选取的个数，0 代表不限制
  limitMaxSize?: number; // 允许最大上传大小，0 代表不限制
  acceptUploadType?: string[]; // 可上传的类型 eg:["gif", "zip"]
  isShowUploadEntry?: boolean; // 是否显示上传入口
  uploadButtonRender?: React.ReactNode; // 自定义上传按钮
  antdButtonProps?: ButtonProps; // antd按钮的属性
  antdUploadProps?: UploadProps; // antd上传的属性
  value?: any[]; // 等价fileList,外部可控
  onChange?: (fileList: any) => void; // 上传附件后或者移除后的回调函数
}

const getFileFromBase64 = (base64: any, fileName: string) => {
  const fileType = base64.match(/^data:([^;]*);/)[1];
  const buffer = Buffer.from(
    base64.replace(/^data:([^;]*);base64,/, ""),
    "base64"
  );
  return new File([buffer.buffer], fileName, { type: fileType });
};

export const ButtonUpload: React.FC<ButtonUploadProps> = (props) => {
  const {
    limitMaxCount = 0,
    limitMaxSize = 0,
    acceptUploadType = [],
    isShowUploadEntry = true,
    antdButtonProps = {},
    antdUploadProps = {},
    uploadButtonRender,
  } = props;

  const [fileList = [], setFileList] =
    useControllableValue<Array<UploadFile>>(props);

  const isLimitCount = limitMaxCount > 0 && fileList.length >= limitMaxCount;

  // 文件上传之前的回调函数
  const beforeUpload = (file: any) => {
    // 判断文件个数是否超出限制
    if (isLimitCount) {
      message.info(`上传失败：文件最多上传 ${limitMaxCount} 个`);
      return;
    }
    // 判断文件大小是否超出限制
    const isLtM = limitMaxSize > 0 && file.size / 1024 / 1024 > limitMaxSize;
    if (isLtM) {
      message.info(`上传失败：单个文件最大为 ${limitMaxSize} MB`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result;
      const f: any = getFileFromBase64(base64, file.name);
      setFileList([...fileList, f]);
      return true;
    };
    reader.onerror = (error) => {
      console.error(error);
      return false;
    };
  };

  // 删除
  const onRemove = (file: any) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };
  return (
    <Upload
      accept={acceptUploadType.map((item) => `.${item}`).join(",")}
      listType="picture"
      method="POST"
      onRemove={onRemove}
      {...antdUploadProps}
      fileList={fileList}
      beforeUpload={beforeUpload}
    >
      {isShowUploadEntry ? (
        uploadButtonRender ? (
          uploadButtonRender
        ) : (
          <Button
            children="上传文件"
            {...antdButtonProps}
            disabled={isLimitCount}
          />
        )
      ) : null}
    </Upload>
  );
};
