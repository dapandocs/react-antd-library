/**
 * Antd 表单预览文本组件
 * @description 表单预览文本组件
 */

import React, { createContext } from 'react';

import PreviewInput from "./Input";

export interface PreviewTextProps {
    previewPlaceholder?: string;
    mode?: "form" | "text";
}

// 定义Text组件的二级子组件类型
interface CompoundedComponent
    extends React.ForwardRefExoticComponent<React.PropsWithChildren<PreviewTextProps>> {
    Input: typeof PreviewInput;
}

export const usePlaceholder = (props: any, text: string | undefined) => {
    const { value } = props;
    if (!value) {
        return text;
    }
    return props.value;
}

export const PreviewTextContext = createContext<PreviewTextProps | null>(null);

const Text: React.FC<React.PropsWithChildren<PreviewTextProps>> = (props) => {
    const {
        children,
        previewPlaceholder = "N/A",
        mode = "form",
    } = props;
    const context = {
        previewPlaceholder,
        mode,
    };
    return (
        <div>
            <PreviewTextContext.Provider value={context}>
                {children}
            </PreviewTextContext.Provider>
        </div>
    )
}
const PText = Text as unknown as CompoundedComponent;
PText.Input = PreviewInput;
export const PreviewText = PText;