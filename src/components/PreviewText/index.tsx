/**
 * Antd 表单预览文本组件
 * @description 表单预览文本组件
 */

import React, { createContext } from 'react';
import PreviewInput from "./Input";
import PreviewInputNumber from "./InputNumber";
import PreviewSelect from './Select';
import PreviewTreeSelect from './TreeSelect';
import PreviewCascader from './Cascader';
import PreviewDatePicker from './DatePicker';
import PreviewDateRangePicker from './DateRangePicker';
import PreviewTimePicker from './TimePicker';
import PreviewCheckbox from './Checkbox';
import PreviewCheckboxGroup from './CheckboxGroup';
import PreviewRadio from './Radio';
import PreviewRadioGroup from './RadioGroup';

export interface PreviewTextProps {
    previewPlaceholder?: string;
    previewMode?: "form" | "text";
    previewClassName?: string;
    previewStyle?: React.CSSProperties;
}

// 定义Text组件的二级子组件类型
interface CompoundedComponent
    extends React.ForwardRefExoticComponent<React.PropsWithChildren<PreviewTextProps>> {
    Input: typeof PreviewInput;
    InputNumber: typeof PreviewInputNumber;
    Select: typeof PreviewSelect;
    TreeSelect: typeof PreviewTreeSelect;
    Cascader: typeof PreviewCascader;
    DatePicker: typeof PreviewDatePicker;
    DateRangePicker: typeof PreviewDateRangePicker;
    TimePicker: typeof PreviewTimePicker;
    Checkbox: typeof PreviewCheckbox;
    CheckboxGroup: typeof PreviewCheckboxGroup;
    Radio: typeof PreviewRadio;
    RadioGroup: typeof PreviewRadioGroup;
}

export const usePlaceholder = (value: any, text: string | undefined) => {
    if (!value) {
        return text;
    }
    return value;
}

export const PreviewTextContext = createContext<PreviewTextProps | null>(null);

const Text: React.FC<React.PropsWithChildren<PreviewTextProps>> = (props) => {
    const {
        children,
        previewPlaceholder = "N/A",
        previewMode = "form",
        previewClassName,
        previewStyle,
    } = props;
    const context = {
        previewPlaceholder,
        previewMode,
        previewClassName,
        previewStyle,
    };
    return (
        <PreviewTextContext.Provider value={context}>
            {children}
        </PreviewTextContext.Provider>
    )
}
export const PreviewText = Text as unknown as CompoundedComponent;

PreviewText.Input = PreviewInput;
PreviewText.InputNumber = PreviewInputNumber;
PreviewText.Select = PreviewSelect;
PreviewText.TreeSelect = PreviewTreeSelect;
PreviewText.Cascader = PreviewCascader;
PreviewText.DatePicker = PreviewDatePicker;
PreviewText.DateRangePicker = PreviewDateRangePicker;
PreviewText.TimePicker = PreviewTimePicker;
PreviewText.Checkbox = PreviewCheckbox;
PreviewText.CheckboxGroup = PreviewCheckboxGroup;
PreviewText.Radio = PreviewRadio;
PreviewText.RadioGroup = PreviewRadioGroup;