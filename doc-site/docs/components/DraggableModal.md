# AntdModal 对话框

> 需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。

## 代码演示

### DraggableModal

```tsx
/**
 * title: DraggableModal基本用法
 * transform: true
 * desc: DraggableModal 和 [Antd Modal](https://ant-design.antgroup.com/components/modal-cn/)用法完全一致，可以使用Antd Modal组件的所有API。
 */
import React from 'react';
import { Button } from 'antd';
import { DraggableModal } from 'react-antd-library';

export default () => {
    const [visible, setVisible] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    return (
        <div>
            <Button onClick={() => setVisible(true)}>打开Modal</Button>
            <DraggableModal
                title="可拖动Modal"
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                <Button onClick={() => setVisible2(true)}>打开Modal2</Button>
                <DraggableModal
                    title="嵌套Modal"
                    visible={visible2}
                    onCancel={() => setVisible2(false)}
                >
                    我是内容
                </DraggableModal>
            </DraggableModal>
        </div>
    );
};
```

## API

更多案例API请参考：[Antd Modal](https://ant-design.antgroup.com/components/modal-cn/)