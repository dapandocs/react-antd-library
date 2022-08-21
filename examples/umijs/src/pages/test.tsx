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
        <div style={{ position: "fixed" }}>
            <SiderBar
                isResizable
                siderRender={siderHtml}
                contentRender={contentHtml}
            />
        </div>
    );
};