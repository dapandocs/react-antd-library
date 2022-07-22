/**
 * 模拟动态进度条
 * @description 实际开发中，可能后端无法提供下载进度，因此可以使用这个组件来模拟进度
 */

import React, { useEffect } from 'react';
import { Progress } from 'antd';
import { useInterval, useControllableValue } from 'ahooks';
import "./AnalogDynamicBar.less";

export const AnalogDynamicBar = (props: any) => {
    const [percent, setPercent] = useControllableValue(props, {
        defaultValue: 0,
    });

    const clear = useInterval(() => {
        const randomNum = Math.random() * 10;

        if (randomNum < 3) {
            const nextPercent = Number((percent + randomNum).toFixed(2));
            setPercent(nextPercent);
        }
    }, 1000);

    useEffect(() => {
        if (Number(percent) > 90) {
            clear();
        }
    }, [percent]);
    return (
        <div>
            {
                percent &&
                <div className='flipInY'>下载进度：{percent}%</div>
            }
            <Progress
                size="default"
                percent={percent}
                status="active"
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
            />
        </div>
    );
};