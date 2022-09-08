import React, { useRef } from 'react';
import {
  DraggableModal,
  useResizeEffect,
} from '../../../../src';
// import { SelectTransferModal } from 'react-antd-library';
import {
  Form,
  Input,
  Select,
  Button,
  Space,
} from 'antd';
import { useSetState } from 'ahooks';

export default () => {
  const [state, setState] = useSetState({
    visible: false,
  });
  const { visible } = state;
  const ref = useRef(document.body);

  useResizeEffect((target) => {
    console.log("333",target);
  }, ref);

  return (
    <>
      <Button onClick={() => setState({ visible: true })}>测试</Button>
      <DraggableModal
        title="测试"
        visible={visible}
        onCancel={() => setState({ visible: false })}
      >
        测试
      </DraggableModal>
    </>
  );

}