# OperateMenuTree 操作菜单树

> 需要用户处理文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。同时具有操作文件夹等交互功能。

## 代码演示

### 基本用法

```tsx
/**
 * title: 基本用法
 * transform: true
 */
import React from 'react';
import { OperateMenuTree } from 'react-antd-library';

const treeData = [
  {
    key: '0-0',
    title: '集团总部',
    value: '0-0',
    children: [
      {
        key: '0-0-1',
        title: '杭州分公司',
        value: '0-0-1',
      },
      {
        key: '0-0-2',
        title: '上海分公司',
        value: '0-0-2',
        children: [
          {
            key: '0-0-1-1',
            title: '研发部',
            value: '0-0-1-1',
          },
          {
            key: '0-0-2-1',
            title: '市场部',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    key: '0-1',
    title: '济南分公司',
    value: '0-1',
  },
];

const OperateMenuTreePage = () => {
  return <OperateMenuTree treeData={treeData} />;
};
export default OperateMenuTreePage;
```

### 搜索参数更改

```tsx
/**
 * title: 搜索参数更改
 * transform: true
 */
import React from 'react';
import { OperateMenuTree } from 'react-antd-library';

const treeData = [
  {
    key: '0-0',
    title: '集团总部',
    value: '0-0',
    children: [
      {
        key: '0-0-1',
        title: '杭州分公司',
        value: '0-0-1',
      },
      {
        key: '0-0-2',
        title: '上海分公司',
        value: '0-0-2',
        children: [
          {
            key: '0-0-1-1',
            title: '研发部',
            value: '0-0-1-1',
          },
          {
            key: '0-0-2-1',
            title: '市场部',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    key: '0-1',
    title: '济南分公司',
    value: '0-1',
  },
];

const OperateMenuTreePage = () => {
  return <OperateMenuTree treeData={treeData} searchParams={{ placeholder: '请输入员工姓名' }} />;
};
export default OperateMenuTreePage;
```

### 搜索关闭

```tsx
/**
 * title: 搜索关闭
 * transform: true
 */
import React from 'react';
import { OperateMenuTree } from 'react-antd-library';

const treeData = [
  {
    key: '0-0',
    title: '集团总部',
    value: '0-0',
    children: [
      {
        key: '0-0-1',
        title: '杭州分公司',
        value: '0-0-1',
      },
      {
        key: '0-0-2',
        title: '上海分公司',
        value: '0-0-2',
        children: [
          {
            key: '0-0-1-1',
            title: '研发部',
            value: '0-0-1-1',
          },
          {
            key: '0-0-2-1',
            title: '市场部',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    key: '0-1',
    title: '济南分公司',
    value: '0-1',
  },
];

const OperateMenuTreePage = () => {
  return <OperateMenuTree treeData={treeData} showSearch={false} />;
};
export default OperateMenuTreePage;
```

### 更改模式

```tsx
/**
 * title: 更改模式
 * transform: true
 * desc: 支持 primary、directory 两种模式。
 */
import React from 'react';
import { OperateMenuTree } from 'react-antd-library';

const treeData = [
  {
    key: '0-0',
    title: '集团总部',
    value: '0-0',
    children: [
      {
        key: '0-0-1',
        title: '杭州分公司',
        value: '0-0-1',
      },
      {
        key: '0-0-2',
        title: '上海分公司',
        value: '0-0-2',
        children: [
          {
            key: '0-0-1-1',
            title: '研发部',
            value: '0-0-1-1',
          },
          {
            key: '0-0-2-1',
            title: '市场部',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    key: '0-1',
    title: '济南分公司',
    value: '0-1',
  },
];

const OperateMenuTreePage = () => {
  return <OperateMenuTree treeData={treeData} mode="directory" />;
};
export default OperateMenuTreePage;
```

### 支持 Tree 组件 API

```tsx
/**
 * title: 支持 Tree 组件 API
 * transform: true
 * desc: MenuTree 和 [Antd Tree](https://ant-design.antgroup.com/components/tree-cn/)用法完全一致，可以使用Antd Tree组件的所有API。
 */
import React, { useState } from 'react';
import { Button } from 'antd';
import { OperateMenuTree } from 'react-antd-library';

const treeData = [
  {
    key: '0-0',
    title: '集团总部',
    value: '0-0',
    children: [
      {
        key: '0-0-1',
        title: '杭州分公司',
        value: '0-0-1',
      },
      {
        key: '0-0-2',
        title: '上海分公司',
        value: '0-0-2',
        children: [
          {
            key: '0-0-1-1',
            title: '研发部',
            value: '0-0-1-1',
          },
          {
            key: '0-0-2-1',
            title: '市场部',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    key: '0-1',
    title: '济南分公司',
    value: '0-1',
  },
];

const OperateMenuTreePage = () => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(false);

  const onExpand = (keys: string[]) => {
    setAutoExpandParent(false);
    setExpandedKeys(keys);
  };

  const onSelect = (keys: string[]) => {
    setSelectedKeys(keys);
  };

  return (
    <div>
      <OperateMenuTree
        treeData={treeData}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        autoExpandParent={autoExpandParent}
        onExpand={onExpand}
        onSelect={onSelect}
      />
      <Button
        type="primary"
        onClick={() => {
          setAutoExpandParent(true);
          setExpandedKeys(['0-0-2']);
          setSelectedKeys(['0-0-2']);
        }}
      >
        打开指定文件夹《上海分公司》
      </Button>
    </div>
  );
};
export default OperateMenuTreePage;
```

### 图标下拉操作

```tsx
/**
 * title: 图标下拉操作
 * transform: true
 */
import React from 'react';
import { Menu, Dropdown, Card, message } from 'antd';
import {
  PlusSquareOutlined,
  FormOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { OperateMenuTree } from 'react-antd-library';

const treeData = [
  {
    key: '0-0',
    title: '集团总部',
    value: '0-0',
    children: [
      {
        key: '0-0-1',
        title: '杭州分公司',
        value: '0-0-1',
      },
      {
        key: '0-0-2',
        title: '上海分公司',
        value: '0-0-2',
        children: [
          {
            key: '0-0-1-1',
            title: '研发部',
            value: '0-0-1-1',
          },
          {
            key: '0-0-2-1',
            title: '市场部',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    key: '0-1',
    title: '济南分公司',
    value: '0-1',
  },
];

const OperateMenuTreePage = () => {
  const menu = (node: Record<string, any>) => (
    <Menu
      onClick={(e) => {
        message.success(`您点击了 ${node.title} 的 ${e.key} 操作！`);
      }}
    >
      <Menu.Item key="添加下级节点" icon={<PlusSquareOutlined size={30} />}>
        添加下级节点
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="编辑" icon={<FormOutlined size={30} />}>
        编 辑
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="删除" icon={<DeleteOutlined size={30} />}>
        删 除
      </Menu.Item>
    </Menu>
  );

  return (
    <Card title="组织架构" size="small" style={{ width: 400 }}>
      <OperateMenuTree
        treeData={treeData}
        renderOperationMenuItems={(node) => (
          <Dropdown overlay={menu(node)}>
            <EllipsisOutlined />
          </Dropdown>
        )}
      />
    </Card>
  );
};
export default OperateMenuTreePage;
```

### 排列操作

```tsx
/**
 * title: 排列操作
 * transform: true
 */
import React from 'react';
import { Space, Card, message } from 'antd';
import { OperateMenuTree } from 'react-antd-library';

const treeData = [
  {
    key: '0-0',
    title: '集团总部',
    value: '0-0',
    children: [
      {
        key: '0-0-1',
        title: '杭州分公司',
        value: '0-0-1',
      },
      {
        key: '0-0-2',
        title: '上海分公司',
        value: '0-0-2',
        children: [
          {
            key: '0-0-1-1',
            title: '研发部',
            value: '0-0-1-1',
          },
          {
            key: '0-0-2-1',
            title: '市场部',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    key: '0-1',
    title: '济南分公司',
    value: '0-1',
  },
];

const OperateMenuTreePage = () => {
  const onMessage = (msg: string, node: Record<string, any>) => {
    message.success(`您点击了 ${node.title} 的 ${msg} 操作！`);
  };

  const renderOperation = (node: Record<string, any>) => {
    return (
      <Space>
        <a onClick={() => onMessage('新建', node)}>新建</a>
        <a type="link" style={{ color: 'inherit' }} onClick={() => onMessage('重命名', node)}>
          重命名
        </a>
        <a type="link" style={{ color: 'inherit' }} onClick={() => onMessage('删除', node)}>
          删除
        </a>
      </Space>
    );
  };

  return (
    <Card title="组织架构" size="small" style={{ width: 400 }}>
      <OperateMenuTree treeData={treeData} renderOperationMenuItems={renderOperation} />
    </Card>
  );
};
export default OperateMenuTreePage;
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| showSearch | 是否开启搜素 | boolean | true |
| mode | 预览的模式 | `primary` \| `directory ` | primary |
| searchParams | 搜索框的参数 | [SearchProps](https://ant-design.gitee.io/components/input-cn/#components-input-demo-search-input) | - |
| fieldNames | 自定义节点 title、key、children、isLeaf 的字段 | object | { title: title, key: key, children: children, isLeaf: isLeaf } |
| renderOperationMenuItems | 自定义节点操作选项 | React.ReactNode |  |
