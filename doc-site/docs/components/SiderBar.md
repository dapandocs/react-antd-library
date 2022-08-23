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
import { SiderBar } from 'react-antd-library';

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
 * desc: 通过属性direction='right'，将侧边栏放到右侧。
 */
import React from 'react';
import { SiderBar } from 'react-antd-library';

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
 * desc: 通过属性mode='overlay'，将侧边栏更改为“覆盖”内容区域的模式。
 */
import React from 'react';
import { SiderBar } from 'react-antd-library';

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
            siderStyle={{ backgroundColor: "#eaff8f", opacity: 0.8 }}
            siderRender={siderHtml}
            contentRender={contentHtml}
        />
    );
};
```

### 侧边栏的高度
```tsx
/**
 * title: 侧边栏的高度
 * desc: 通过属性layoutHeight，设置侧边栏的布局高度。
 */
import React from 'react';
import { SiderBar } from 'react-antd-library';

export default () => {
    const siderHtml = (
        <div style={{ fontSize: 16, fontWeight: "bold", padding: 24 }}>我是侧边栏，高度为：400px</div>
    );
    const contentHtml = (
        <div style={{ fontSize: 16, fontWeight: "bold", padding: 24 }}>我是内容栏;我是内容栏;我是内容栏;我是内容栏;我是内容栏;我是内容栏;我是内容栏;</div>
    );
    return (
        <SiderBar
            layoutHeight={400}
            siderStyle={{ backgroundColor: "#eee" }}
            siderRender={siderHtml}
            contentRender={contentHtml}
        />
    );
};
```

### 侧边栏的伸缩
```tsx
/**
 * title: 侧边栏的伸缩
 * iframe: 500
 * desc: 通过属性isResizable，开启侧边栏的伸缩功能。
 */
import React from 'react';
import { SiderBar } from 'react-antd-library';

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
            我是侧边栏，拖动中间线试试
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
            isResizable
            siderRender={siderHtml}
            contentRender={contentHtml}
        />
    );
};
```

### 侧边栏宽度的最小值和最大值
```tsx
/**
 * title: 侧边栏的伸缩
 * iframe: 500
 * desc: 通过属性siderMinWidth和siderMaxWidth，设置侧边栏宽度的最大值和最小值。
 */
import React from 'react';
import { SiderBar } from 'react-antd-library';

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
            我是侧边栏，宽度最大500px，最小100px
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
            isResizable
            siderMinWidth={100}
            siderMaxWidth={500}
            siderRender={siderHtml}
            contentRender={contentHtml}
        />
    );
};
```

### 侧边栏受控模式
```tsx
/**
 * title: 侧边栏受控模式
 * iframe: 500
 * desc: 通过属性siderWidth，动态控制侧边栏的宽度。
 */
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { SiderBar } from 'react-antd-library';

export default () => {
    const [siderWidth, setSiderWidth] = useState(500);
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
                height: "100vh",
            }}>
            <Space>
                <div>我是内容栏</div>
                <Button
                    type="primary"
                    onClick={() => setSiderWidth(500)}
                    disabled={siderWidth === 500}
                >
                    展开
                </Button>
                <Button
                    type="primary"
                    onClick={() => setSiderWidth(0)}
                    disabled={siderWidth === 0}
                >
                    折叠
                </Button>
            </Space>
        </div>
    );
    return (
        <SiderBar
            isHasHandle={false}
            siderWidth={siderWidth}
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
| isResizable       | 是否可以拖动调整大小         | boolean             | false       |
| isHasHandle       | 是否开启手柄         | boolean             | true       |
| mode     | 侧边栏的模式         | `side` \| `overlay ` | side |
| siderRender  | 自定义侧边栏的 render    | string             | ReactNode        |
| contentRender    | 自定义内容栏的 render   | string             | ReactNode        |
| layoutHeight          | 侧边栏的高度        | number             | “100vh”         |
| siderWidth          | 侧边栏的宽度        | number             | “248px”         |
| siderMinWidth          | 侧边栏的最小宽度        | number             | “236px”         |
| siderMaxWidth          | 侧边栏的最大宽度        | number             | “480px”         |
| splitLineStyle | 中间分割线 style   | CSSProperties            | -     |
| splitLineClassName      | 中间分割线 className | CSSProperties            | -     |
| siderStyle | 侧边栏 style   | CSSProperties            | -     |
| siderClassName      | 侧边栏 className | CSSProperties            | -     |
| onChange      | 切换时回调函数   | ( siderWidth:number )=>void |     -      |