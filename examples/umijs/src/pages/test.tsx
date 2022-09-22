import React, { useState } from "react";
import { Button, Table } from "antd";
import XLSX from "xlsx-js-style";
import { exportUtils, importUtils, ButtonUpload } from "react-antd-library";
import { tableUtils } from "../../../../src";

const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
  {
    key: "3",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    render: (t: any, row: any) => tableUtils.mergeTableField(row, "name"),
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
];

const exportUser = () => {
  const [jsonData, setJsonData] = useState<any>([]);

  const downloadExcel = () => {
    exportUtils.jsonToExcel(XLSX, {
      columns,
      data: dataSource,
      fileName: "用户列表",
    });
  };

  return (
    <div>
      <Button type="primary" onClick={downloadExcel}>
        导出Excel模板
      </Button>
      <ButtonUpload
        antdUploadProps={{
          maxCount: 1,
        }}
        antdButtonProps={{
          children: "导入Excel模板",
        }}
        onChange={(files: any[]) => {
          importUtils.excelToJson(XLSX, {
            columns,
            file: files[0],
            onLoadEnd: (jData) => {
              setJsonData(jData);
            },
          });
        }}
      />
      {Array.isArray(jsonData) && jsonData.length ? (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      ) : null}
      <Table
        dataSource={tableUtils.mergeTableRows(dataSource, ["name"])}
        columns={columns}
        rowKey="key"
        pagination={false}
      />
    </div>
  );
};
export default exportUser;
