import React from 'react';
import { Tooltip } from 'antd';
import cls from 'classnames';
import { useSetState, useControllableValue, usePrevious } from 'ahooks';
import './SiderLeftBar.less';

export type SiderLeftBarProps = {
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

export const SiderLeftBar: React.FC<SiderLeftBarProps> = (props) => {
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
        const currentSiderWidth = siderWidth + event.pageX - startPageX;
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

    const layoutProps = mode === "overlay" ? {} : { style: { paddingLeft: pxWidth } };

    return (
        <div id="antd-layout-left" {...layoutProps}>
            <div
                className="antd-sider"
                style={{ width: pxWidth }}
                onMouseOver={() => setState({ isOvering: true })}
                onMouseOut={() => setState({ isOvering: false })}
            >
                {siderRender}
            </div>
            <div className="antd-content">{contentRender}</div>
            {
                isResizable ?
                    <div
                        className={cls("antd-sider-resizer", splitLineClassName)}
                        style={splitLineStyle}
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
                className="antd-sider-icon-left"
                style={{ left: siderWidth - 16 }}
                onMouseOver={() => setState({ isOvering: true })}
                onMouseOut={() => setState({ isOvering: false })}
            >
                <div
                    style={{ display: isOvering && siderWidth !== 0 ? 'flex' : 'none' }}
                    onClick={() => setSiderWidth(0)}
                    className="antd-left-collage"
                >
                    <Tooltip title="折叠" placement="rightTop">
                        {`<<`}
                    </Tooltip>
                </div>
                <div
                    style={{ display: siderWidth === 0 ? 'flex' : 'none' }}
                    onClick={() => setSiderWidth(previous)}
                    className="antd-left-expand"
                >
                    <Tooltip title="展开" placement="rightTop">
                        {`>>`}
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}