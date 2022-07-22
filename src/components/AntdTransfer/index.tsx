import React from 'react';
import {
    AntdTransferProps as AntdTransferComponentProps,
    TransferItem as TransferComponentItem,
    AntdTransfer as AntdTransferComponent,
} from './AntdTransfer';
import {
    AntdAutoTransfer,
} from './AntdAutoTransfer';

export type AntdTransferProps = AntdTransferComponentProps;
export type TransferItem = TransferComponentItem;

export const AntdTransfer = ({
    type = "primary",
    ...restProps
}: AntdTransferProps & { type?: "primary" | "auto" }) => {
    if (type = "auto") {
        return <AntdAutoTransfer {...restProps} />
    }
    return <AntdTransferComponent {...restProps} />
}