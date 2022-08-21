import React from 'react';
import {
    SiderLeftBarProps,
    SiderLeftBar,
} from './SiderLeftBar';
import {
    SiderRightBar,
} from './SiderRightBar';

export interface SiderBarProps extends SiderLeftBarProps {
    direction?: "left" | "right";
}

export const SiderBar: React.FC<SiderBarProps> = ({
    direction = "left",
    ...props
}) => {
    if (direction === "left") {
        return <SiderLeftBar {...props} />;
    }
    return <SiderRightBar {...props} />;
};