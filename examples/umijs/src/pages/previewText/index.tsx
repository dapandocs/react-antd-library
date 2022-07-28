import React from "react";
import {
    PreviewText
} from '../../../../../src';
import { Input, Form } from 'antd';
import styles from './index.less';

const PreviewTextPage = (props: any) => {
    return (
        <PreviewText mode="text">
            <Form>
                <Form.Item label="测试" name="test">
                    <PreviewText.Input
                        placeholder="请输入"
                        suffix="万元"
                        previewPlaceholder="预览"
                        // className={styles.font}
                        style={{color: "red"}}
                    />
                </Form.Item>
            </Form>
        </PreviewText>
    );
};
export default PreviewTextPage;