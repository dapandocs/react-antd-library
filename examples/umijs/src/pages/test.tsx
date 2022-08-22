import React from 'react';
// import { SiderBar } from '@react-spy/antd';
import { SiderBar } from '../../../../src'

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