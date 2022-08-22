# SiberBar 伸缩侧边栏

>SiberBar 布局空间不足时，可用伸缩侧边栏暂时隐藏获得更多空间。

## 代码演示

### 基本用法

```tsx
/**
 * title: 基本用法
 * iframe: 500
 */
import React from 'react';
import { SiderBar } from '@react-spy/antd';

export default () => {
    const siderHtml = (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 16,
                fontWeight: "bold",
                height: "100vh",
            }}>
            我是侧边栏
        </div>
    );
    const contentHtml = (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 16,
                fontWeight: "bold",
                height: "100vh",
            }}>
            我是内容栏
        </div>
    );
    return (
        <SiderBar
            siderRender={siderHtml}
            contentRender={contentHtml}
        />
    );
};
```
### 侧边栏的位置方向

```tsx
/**
 * title: 侧边栏的位置方向
 * iframe: 500
 */
import React from 'react';
import { SiderBar } from '@react-spy/antd';

export default () => {
    const siderHtml = (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 16,
                fontWeight: "bold",
                height: "100vh",
            }}>
            我是侧边栏
        </div>
    );
    const contentHtml = (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 16,
                fontWeight: "bold",
                height: "100vh",
            }}>
            我是内容栏
        </div>
    );
    return (
        <SiderBar
            direction='right'
            siderRender={siderHtml}
            contentRender={contentHtml}
        />
    );
};
```

### 侧边栏的模式
```tsx
/**
 * title: 侧边栏的模式--侧边(sider)和覆盖(overlay)
 * iframe: 500
 */
import React from 'react';
import { SiderBar } from '@react-spy/antd';

export default () => {
    const siderHtml = (
        <div style={{ fontSize: 16, fontWeight: "bold", padding: 24 }}>我是侧边栏</div>
    );
    const contentHtml = (
        <div style={{ fontSize: 16, fontWeight: "bold", padding: 24 }}>我是内容栏;我是内容栏;我是内容栏;我是内容栏;我是内容栏;我是内容栏;我是内容栏;</div>
    );
    return (
        <SiderBar
            mode="overlay"
            siderStyle={{ backgroundColor: "#eee" }}
            siderRender={siderHtml}
            contentRender={contentHtml}
        />
    );
};
```

## API

### SiberBar

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