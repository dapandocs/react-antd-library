
import React from 'react';
import {
    Tooltip,
    Button,
} from 'antd';
import { DraggableModal, useDraggable } from '../../../../src';

const Test = () => {
    const [visible, setVisible] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const { target } = useDraggable({
        maxDistance: {
            x: {  max: 200 },
            y: {  max: 200 },
        }
    });
    return (
        <div>
            <Button onClick={() => setVisible(true)}>测试</Button>
            <DraggableModal
                title="测试"
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                <Button onClick={() => setVisible2(true)}>测试2</Button>
                <DraggableModal
                    title="测试"
                    visible={visible2}
                    onCancel={() => setVisible2(false)}
                >
                    333
                </DraggableModal>
            </DraggableModal>
            <Button ref={target}>测试44444</Button>
        </div>
    );
};
export default Test;