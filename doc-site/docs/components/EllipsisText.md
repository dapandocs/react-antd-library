# EllipsisText 文本省略

>EllipsisText 展示空间不足时，隐去部分内容并用“...”替代。

## 代码演示

### 尾部省略

```tsx
/**
 * title: 尾部省略
 * transform: true
 */
import React from 'react';
import { EllipsisText } from '@react-spy/antd';

const text = `AntV是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。`;
export default () => {
    return (
        <EllipsisText content={text} />
    );
};
```

### 头部省略

```tsx
/**
 * title: 头部省略
 * transform: true
 */
import React from 'react';
import { EllipsisText } from '@react-spy/antd';

const text = `AntV是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。`;
export default () => {
    return (
        <EllipsisText content={text} direction="start" />
    );
};
```

### 中间省略

```tsx
/**
 * title: 中间省略
 * transform: true
 */
import React from 'react';
import { EllipsisText } from '@react-spy/antd';

const text = `AntV是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。`;
export default () => {
    return (
        <EllipsisText content={text} direction="middle" />
    );
};
```

### 多行省略

```tsx
/**
 * title: 多行省略
 * transform: true
 */
import React from 'react';
import { EllipsisText } from '@react-spy/antd';

const text = `AntV是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。`;
export default () => {
    return (
        <EllipsisText content={text} rows={2} />
    );
};
```

### 展开收起

```tsx
/**
 * title: 展开收起
 * transform: true
 */
import React from 'react';
import { EllipsisText } from '@react-spy/antd';

const text = `AntV是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。`;
export default () => {
    return (
        <EllipsisText content={text} expandText="展开" collapseText='收起' />
    );
};
```

### 仅展开

```tsx
/**
 * title: 仅展开
 * transform: true
 */
import React from 'react';
import { EllipsisText } from '@react-spy/antd';

const text = `AntV是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。`;
export default () => {
    return (
        <EllipsisText content={text} expandText="展开" />
    );
};
```

### 更换省略符

```tsx
/**
 * title: 更换省略符
 * transform: true
 */
import React from 'react';
import { EllipsisText } from '@react-spy/antd';

const text = `AntV是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。`;
export default () => {
    return (
        <EllipsisText content={text}  expandText="展开" collapseText='收起'  ellipsis="★★★★★★★★" />
    );
};
```

### 提示完整内容

```tsx
/**
 * title: 提示完整内容
 * transform: true
 */
import React from 'react';
import { EllipsisText } from '@react-spy/antd';

const text = `AntV是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。`;
export default () => {
    return (
        <EllipsisText content={text} isOpenTooltip />
    );
};
```

### 受控模式

```tsx
/**
 * title: 受控模式
 * transform: true
 */
import React, { useState } from 'react';
import { Space, Button } from 'antd';
import { EllipsisText } from '@react-spy/antd';

const text = `AntV是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。`;
export default () => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div>
            <EllipsisText
                content={text}
                expanded={expanded}
                onChange={(ex) => setExpanded(ex)}
            />
            <Space style={{ marginTop: 24 }}>
                <Button type="primary" onClick={() => setExpanded(true)}>展开</Button>
                <Button danger onClick={() => setExpanded(false)}>折叠</Button>
                <Button type="dashed" onClick={() => setExpanded(!expanded)}>切换</Button>
            </Space>
        </div>
    );
};
```

## API

### EllipsisText

| 参数          | 说明             | 类型               | 默认值    |
| ------------- | ---------------- | ------------------ | --------- |
| content       | 文本内容         | string             | N/A       | -   |
| direction     | 省略位置         | `start` \| `end ` \| `middle ` | end |
| collapseText  | 收起操作的文案   | string             | ''        |
| expandText    | 展开操作的文案   | string             | ''        |
| rows          | 展示几行         | number             | 1         |
| isOpenTooltip | 是开启提示信息   | boolean            | false     |
| expanded      | 指定当前是否展开 | boolean            | false     |
| onChange      | 切换时回调函数   | ( expanded )=>void |           |