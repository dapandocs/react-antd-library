import React from "react";
import {
    Modal,
    ModalProps,
} from 'antd';
import { useSetState } from 'ahooks';

export interface DraggableModalProps extends ModalProps {
    isCanDrag?: true,
}

export const DraggableModal: React.FC<React.PropsWithChildren<DraggableModalProps>> = ({
    isCanDrag = true,
    wrapClassName,
    visible,
    ...restProps
}) => {

    const [state, setState] = useSetState({
        simpleClass: Math.random().toString(36).substring(2),
    });
    const { simpleClass } = state;

    // 鼠标按下时的坐标
    const startXY = React.useRef<[number, number]>([0, 0])
    // 上次移动的距离
    const prevPosition = React.useRef<[number, number]>([0, 0])
    const dragging = React.useRef<boolean>(false)

    const modalContentRef = React.useRef(null)

    const handleDown = (e: MouseEvent) => {
        const [prevX, prevY] = prevPosition.current
        let [x, y] = prevPosition.current
        dragging.current = true
        x = e.pageX - prevX
        y = e.pageY - prevY
        startXY.current = [x, y]
    }

    const handleMove = (e: MouseEvent) => {
        if (!dragging.current) return

        const [startX, startY] = startXY.current
        let [x, y] = prevPosition.current
        x = e.pageX - startX
        y = e.pageY - startY
        prevPosition.current = [x, y]
        // @ts-ignore
        modalContentRef.current.style.transform = `translate(${x}px, ${y}px)`
    }

    const handleUp = (e: MouseEvent) => {
        dragging.current = false
    }

    React.useEffect(() => {
        if (simpleClass && visible) {
            const container: any = document.getElementsByClassName(simpleClass)[0]
            const header = container.getElementsByClassName('ant-modal-header')[0]
            const modal = container.getElementsByClassName('ant-modal-content')[0]
            modalContentRef.current = modal
            header.style.cursor = "all-scroll"
            // 鼠标按下
            header.addEventListener('mousedown', handleDown)
            // 鼠标移动
            document.addEventListener('mousemove', handleMove)
            document.addEventListener('mouseup', handleUp)
            return () => {
                header.removeEventListener('mousedown', handleDown)
                document.removeEventListener('mousemove', handleMove)
                document.removeEventListener('mouseup', handleUp)
            }
        }
    }, [visible])

    const wrapModalClassName = wrapClassName ? `${wrapClassName} ${simpleClass}` : `${simpleClass}`;
    return (
        <Modal
            visible={visible}
            {...restProps}
            wrapClassName={wrapModalClassName}
        />
    );
};