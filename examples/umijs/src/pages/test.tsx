import { useState } from 'react';
import { Button, Spin } from 'antd';
import { exportUtils } from 'react-antd-library';

const exportUser = () => {
    const [downloading, setDownloading] = useState(false);
    const hanldeDownloadUser = () => {
        exportUtils.downloadFile({
            url: "/api/user/downloadUser",
            method: "post",
            data: {
                sex: 'male'
            },
            headers: {
                Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiYmIyYmMyNGIy"
            },
            callback: (loading) => {
                setDownloading(loading)
            },
            fileName: "用户列表.xls"
        });
    }
    return (
        <Spin spinning={downloading} tip="附件下载中...">
            <Button onClick={hanldeDownloadUser}>下载附件</Button>
        </Spin>
    );
};
export default exportUser;