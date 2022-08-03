import React from 'react';
import { message } from 'antd';
import { ButtonUpload } from '@react-spy/antd';

const fileList = [
    {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '2',
        name: 'yyy.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '3',
        name: 'zzz.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
];

export default () => {
    return (
        <ButtonUpload
            value={fileList}
            isShowUploadEntry={false}
            antdUploadProps={{
                showUploadList: {
                    showDownloadIcon: true,
                    showRemoveIcon: false,
                },
                onDownload: (file) => {
                    const { name } = file;
                    message.success(`您点击了${name}的下载按钮`);
                }
            }}
        />
    );
};