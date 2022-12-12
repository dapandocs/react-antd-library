# MenuTree 菜单树

> 需要用户处理文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用 树控件 可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## 代码演示

### 基本用法

```tsx
/**
 * title: 基本用法
 * transform: true
 */
import React from 'react';
import { MenuTree } from 'react-antd-library';

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

const MenuTreePage = () => {
  return <MenuTree treeData={treeData} />;
};
export default MenuTreePage;
```

### 搜索参数更改

```tsx
/**
 * title: 搜索参数更改
 * transform: true
 */
import React from 'react';
import { MenuTree } from 'react-antd-library';

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

const MenuTreePage = () => {
  return <MenuTree treeData={treeData} searchParams={{ placeholder: '请输入员工姓名' }} />;
};
export default MenuTreePage;
```

### 搜索关闭

```tsx
/**
 * title: 搜索关闭
 * transform: true
 */
import React from 'react';
import { MenuTree } from 'react-antd-library';

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

const MenuTreePage = () => {
  return <MenuTree treeData={treeData} showSearch={false} />;
};
export default MenuTreePage;
```

### 更改模式

```tsx
/**
 * title: 更改模式
 * transform: true
 * desc: 支持 primary、directory 两种模式。
 */
import React from 'react';
import { MenuTree } from 'react-antd-library';

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

const MenuTreePage = () => {
  return <MenuTree treeData={treeData} mode="directory" />;
};
export default MenuTreePage;
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
import { MenuTree } from 'react-antd-library';

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

const MenuTreePage = () => {
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
      <MenuTree
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
export default MenuTreePage;
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| showSearch | 是否开启搜素 | boolean | true |
| mode | 预览的模式 | `primary` \| `directory ` | primary |
| searchParams | 搜索框的参数 | [SearchProps](https://ant-design.gitee.io/components/input-cn/#components-input-demo-search-input) | - |
| fieldNames | 自定义节点 title、key、children、isLeaf 的字段 | object | { title: title, key: key, children: children, isLeaf: isLeaf } |
