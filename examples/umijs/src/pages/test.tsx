import React from 'react';
// import { SiderBar } from '@react-spy/antd';
import { SiderBar } from '../../../../src';

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
            isResizable
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