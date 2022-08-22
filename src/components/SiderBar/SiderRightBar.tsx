import React from 'react';
import { Tooltip } from 'antd';
import cls from 'classnames';
import { useSetState, useControllableValue, usePrevious } from 'ahooks';
import './SiderRightBar.less';

export type SiderRightBarProps = {
    siderMinWidth?: number;
    siderMaxWidth?: number;
    // 布局的高度
    layoutHeight?: number | string;
    mode?: "side" | "overlay";
    // 是否可以调整大小
    isResizable?: boolean;
    // 分割线的样式
    splitLineStyle?: React.CSSProperties;
    splitLineClassName?: string;
    siderRender?: React.ReactNode;
    contentRender?: React.ReactNode;
    siderWidth?: number;
    onChange?: (siderWidth: number) => void;
};

type State = {
    dragging: boolean;
    startPageX: number;
    isOvering: boolean;
};

export const SiderRightBar: React.FC<SiderRightBarProps> = (props) => {
    const {
        siderMinWidth = 236,
        siderMaxWidth = 480,
        mode = "side",
        isResizable = false,
        splitLineStyle = {},
        splitLineClassName = "",
        siderRender,
        contentRender,
        layoutHeight = "100vh"
    } = props;
    const [state, setState] = useSetState<State>({
        dragging: false,
        isOvering: false,
        startPageX: 0,
    });
    const {
        dragging,
        startPageX,
        isOvering,
    } = state;

    const ref = React.useRef<HTMLDivElement>(null);
    const [siderWidth = 248, setSiderWidth] = useControllableValue(props);
    const pxWidth = `${siderWidth}px`;
    const previous = usePrevious(siderWidth);

    React.useEffect(() => {
        document.documentElement?.style.setProperty('--sider-bar-height', typeof layoutHeight === 'number' ? `${layoutHeight}px` : layoutHeight);
    }, [layoutHeight]);

    const handleMouseDown = (event: React.MouseEvent) => {
        setState({
            startPageX: event.pageX,
            dragging: true,
        });
    };
    const handleMouseMove = (event: React.MouseEvent) => {
        console.log(siderWidth, event.pageX, startPageX);
        let currentSiderWidth;
        if (startPageX >= event.pageX) {
            // 向左拖动，sider逐渐变大
            currentSiderWidth = siderWidth + startPageX - event.pageX;
        } else {
            // 向右拖动，sider逐渐变小
            currentSiderWidth = siderWidth - (event.pageX - startPageX);
        }
        if (currentSiderWidth < siderMinWidth || currentSiderWidth > siderMaxWidth) {
            // @ts-ignore
            event.currentTarget.style.cursor = 'not-allowed';
            return;
        }
        // @ts-ignore
        if (event.currentTarget.style.cursor === 'not-allowed') {
            // @ts-ignore
            event.currentTarget.style.cursor = 'ew-resize';
        }
        setSiderWidth(currentSiderWidth);
        setState({ startPageX: event.pageX, isOvering: false });
    };

    const layoutProps = mode === "overlay" ? {} : { style: { paddingRight: pxWidth } };
    return (
        <div id="antd-layout-right" {...layoutProps}>
            <div className="antd-content">{contentRender}</div>
            <div
                className="antd-sider"
                style={{ width: pxWidth }}
                onMouseOver={() => setState({ isOvering: true })}
                onMouseOut={() => setState({ isOvering: false })}
            >
                {siderRender}
            </div>
            {
                isResizable ?
                    <div
                        className={cls("antd-sider-resizer", splitLineClassName)}
                        style={{ right: siderWidth }}
                        onMouseDown={handleMouseDown}
                        onMouseOver={() => setState({ isOvering: true })}
                        onMouseOut={() => setState({ isOvering: false })}
                    >
                        {
                            dragging &&
                            <div
                                ref={ref}
                                className="antd-resize-mask"
                                onMouseMove={handleMouseMove}
                                onMouseUp={() => setState({ dragging: false })}
                            />
                        }
                    </div> :
                    <div
                        style={splitLineStyle}
                        className={cls("antd-sider-disable-resizer", splitLineClassName)}
                    />
            }
            <div
                className="antd-sider-icon-right"
                style={{ right: siderWidth - 16 > 0 ? siderWidth - 16 : 0 }}
                onMouseOver={() => setState({ isOvering: true })}
                onMouseOut={() => setState({ isOvering: false })}
            >
                <div
                    style={{ display: isOvering && siderWidth !== 0 ? 'flex' : 'none' }}
                    onClick={() => setSiderWidth(0)}
                    className="antd-right-collage"
                >
                    <Tooltip title="折叠" placement="leftTop">
                        {`>>`}
                    </Tooltip>
                </div>
                <div
                    style={{ display: siderWidth === 0 ? 'flex' : 'none' }}
                    onClick={() => setSiderWidth(previous)}
                    className="antd-right-expand"
                >
                    <Tooltip title="展开" placement="leftTop">
                        {`<<`}
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}