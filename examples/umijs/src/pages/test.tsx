import React, { useState } from 'react';
import { Button, Space } from 'antd';
// import { SiderBar } from '@react-spy/antd';
import { SiderBar } from '../../../../src'

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

// import React from 'react';
// import {
//     Tooltip,
//     Button,
// } from 'antd';

// const Test = ()=>{
//     return (
//         <Tooltip title="测试">
//             <Button>测试</Button>
//         </Tooltip>
//     );
// };
// export default Test;