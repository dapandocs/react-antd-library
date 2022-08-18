import React from 'react';
import useResizeEffect from '../../hooks/useResizeEffect';
import { useIsomorphicLayoutEffect, useControllableValue } from 'ahooks'

export type EllipsisProps = {
    content: string
    direction?: 'start' | 'end' | 'middle'
    rows?: number
    expandText?: string
    collapseText?: string
    ellipsis?: string;
    isOpenTooltip?: boolean;
    expanded?: boolean;
    onChange?: (expanded: boolean) => void;
}

type EllipsisedValue = {
    leading?: string
    tailing?: string
}

export const EllipsisText: React.FC<EllipsisProps> = props => {
    const rootRef = React.useRef<HTMLDivElement>(null)

    const [ellipsised, setEllipsised] = React.useState<EllipsisedValue>({})
    const [exceeded, setExceeded] = React.useState(false)

    const [expanded, setExpanded] = useControllableValue(props, {
        valuePropName: 'expanded',
    });

    function calcEllipsised() {
        const root = rootRef.current
        if (!root) return
        if (!root.offsetParent) return
        const originStyle = window.getComputedStyle(root)
        const container = document.createElement('div')
        const styleNames: string[] = Array.prototype.slice.apply(originStyle)
        styleNames.forEach(name => {
            container.style.setProperty(name, originStyle.getPropertyValue(name))
        })
        container.style.position = 'fixed'
        container.style.left = '999999px'
        container.style.top = '999999px'
        container.style.zIndex = '-1000'
        container.style.height = 'auto'
        container.style.minHeight = 'auto'
        container.style.maxHeight = 'auto'
        container.style.textOverflow = 'clip'
        container.style.whiteSpace = 'normal'
        container.style.webkitLineClamp = 'unset'
        container.style.display = 'block'

        const lineHeight = pxToNumber(originStyle.lineHeight)
        const maxHeight = Math.floor(
            // @ts-ignore
            lineHeight * (props.rows + 0.5) +
            pxToNumber(originStyle.paddingTop) +
            pxToNumber(originStyle.paddingBottom)
        )

        container.innerText = props.content
        document.body.appendChild(container)

        if (container.offsetHeight <= maxHeight) {
            setExceeded(false)
        } else {
            setExceeded(true)
            const end = props.content.length
            const actionText = expanded ? props.collapseText : props.expandText

            // @ts-ignore
            function check(left: number, right: number): EllipsisedValue {
                if (right - left <= 1) {
                    if (props.direction === 'end') {
                        return {
                            leading: props.content.slice(0, left) + props.ellipsis,
                        }
                    } else {
                        return {
                            tailing: props.ellipsis + props.content.slice(right, end),
                        }
                    }
                }
                const middle = Math.round((left + right) / 2)
                if (props.direction === 'end') {
                    container.innerText =
                        props.content.slice(0, middle) + props.ellipsis + actionText
                } else {
                    container.innerText =
                        // @ts-ignore
                        actionText + props.ellipsis + props.content.slice(middle, end)
                }
                if (container.offsetHeight <= maxHeight) {
                    if (props.direction === 'end') {
                        return check(middle, right)
                    } else {
                        return check(left, middle)
                    }
                } else {
                    if (props.direction === 'end') {
                        return check(left, middle)
                    } else {
                        return check(middle, right)
                    }
                }
            }

            // @ts-ignore
            function checkMiddle(
                leftPart: [number, number],
                rightPart: [number, number]
            ): EllipsisedValue {
                if (
                    leftPart[1] - leftPart[0] <= 1 &&
                    rightPart[1] - rightPart[0] <= 1
                ) {
                    return {
                        leading: props.content.slice(0, leftPart[0]) + props.ellipsis,
                        tailing: props.ellipsis + props.content.slice(rightPart[1], end),
                    }
                }
                const leftPartMiddle = Math.floor((leftPart[0] + leftPart[1]) / 2)
                const rightPartMiddle = Math.ceil((rightPart[0] + rightPart[1]) / 2)
                container.innerText =
                    props.content.slice(0, leftPartMiddle) +
                    props.ellipsis +
                    actionText +
                    props.ellipsis +
                    props.content.slice(rightPartMiddle, end)
                if (container.offsetHeight <= maxHeight) {
                    return checkMiddle(
                        [leftPartMiddle, leftPart[1]],
                        [rightPart[0], rightPartMiddle]
                    )
                } else {
                    return checkMiddle(
                        [leftPart[0], leftPartMiddle],
                        [rightPartMiddle, rightPart[1]]
                    )
                }
            }

            const middle = Math.floor((0 + end) / 2)
            const ellipsised =
                props.direction === 'middle'
                    ? checkMiddle([0, middle], [middle, end])
                    : check(0, end)
            setEllipsised(ellipsised)
        }
        document.body.removeChild(container)
    }

    useResizeEffect(calcEllipsised, rootRef)
    useIsomorphicLayoutEffect(() => {
        calcEllipsised()
    }, [
        props.content,
        props.direction,
        props.rows,
        props.expandText,
        props.collapseText,
    ])

    const expandActionElement =
        exceeded && props.expandText
            ?
            <a
                onClick={() => {
                    setExpanded(true)
                }}
            >
                {props.expandText}
            </a>
            : null

    const collapseActionElement =
        exceeded && props.expandText
            ?
            <a
                onClick={() => {
                    setExpanded(false)
                }}
            >
                {props.collapseText}
            </a>
            : null

    const renderContent = () => {
        if (!exceeded) {
            return props.content
        }
        if (expanded) {
            return (
                <>
                    {props.content}
                    {collapseActionElement}
                </>
            )
        } else {
            return (
                <>
                    {ellipsised.leading}
                    {expandActionElement}
                    {ellipsised.tailing}
                </>
            )
        }
    }

    return (
        <div
            ref={rootRef}
            title={props.isOpenTooltip ? props.content : undefined}
        >
            {renderContent()}
        </div>
    )
}

function pxToNumber(value: string | null): number {
    if (!value) return 0
    const match = value.match(/^\d*(\.\d*)?/)
    return match ? Number(match[0]) : 0
}

EllipsisText.defaultProps = {
    direction: 'end',
    rows: 1,
    expandText: '',
    collapseText: '',
    ellipsis: '...',
    isOpenTooltip: false,
}