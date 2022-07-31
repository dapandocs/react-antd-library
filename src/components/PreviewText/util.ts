import moment from 'moment';

// 判断是否为有效值
export const isValid = (value: any) => value !== undefined && value !== null;

// 是否为数组
export const isArr = (value: any) => Array.isArray(value);

// 转数组
export const toArr = (val: any): any[] => (Array.isArray(val) ? val : val ? [val] : []);

// 是否是函数
const isFn = (val: any): val is Function => typeof val === 'function';

// 是否为空
export function isEmpty(val: any, strict = false): boolean {
    // Null and Undefined...
    if (val == null) {
        return true
    }

    // Booleans...
    if (typeof val === 'boolean') {
        return false
    }

    // Numbers...
    if (typeof val === 'number') {
        return false
    }

    // Strings...
    if (typeof val === 'string') {
        return val.length === 0
    }

    // Functions...
    if (typeof val === 'function') {
        return val.length === 0
    }

    // Arrays...
    if (Array.isArray(val)) {
        if (val.length === 0) {
            return true
        }
        for (let i = 0; i < val.length; i++) {
            if (strict) {
                if (val[i] !== undefined && val[i] !== null) {
                    return false
                }
            } else {
                if (
                    val[i] !== undefined &&
                    val[i] !== null &&
                    val[i] !== '' &&
                    val[i] !== 0
                ) {
                    return false
                }
            }
        }
        return true
    }

    // Objects...
    if (val.toString === toString) {
        switch (val.toString()) {
            // Maps, Sets, Files and Errors...
            case '[object File]':
            case '[object Map]':
            case '[object Set]': {
                return val.size === 0
            }
        }
    }

    // Anything else...
    return false
}

export const formatMomentValue = (
    value: any,
    format: any,
    placeholder?: string
): string | string[] => {
    const formatDate = (date: any, format: any, i = 0) => {
        if (!date) return placeholder
        if (isArr(format)) {
            const _format = format[i]
            if (isFn(_format)) {
                return _format(date)
            }
            if (isEmpty(_format)) {
                return date
            }
            return moment(date).format(_format)
        } else {
            if (isFn(format)) {
                return format(date)
            }
            if (isEmpty(format)) {
                return date
            }
            return moment(date).format(format)
        }
    }
    if (isArr(value)) {
        return value.map((val: any, index: any) => {
            return formatDate(val, format, index)
        })
    } else {
        return value ? formatDate(value, format) : value || placeholder
    }
}

export const getFormat = (props: any) => {
    if (props.format) {
        return props.format;
    }
    if (props.picker === "date") {
        return "YYYY-MM-DD";
    }
    if (props.picker === "month") {
        return "YYYY-MM";
    }
    if (props.picker === "week") {
        return "YYYY-WW";
    }
    if (props.picker === "time") {
        return "HH:mm:ss";
    }
    if (props.picker === "year") {
        return "YYYY";
    }
    if (props.picker === "quarter") {
        return "YYYY-QQ";
    }
    return "YYYY-MM-DD";
};