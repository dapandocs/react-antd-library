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

export const AntdTransfer: React.FC<AntdTransferProps & { type?: "primary" | "auto" }> = ({
    type = "primary",
    ...restProps
}) => {
    if (type = "auto") {
        return <AntdAutoTransfer {...restProps} />
    }
    return <AntdTransferComponent {...restProps} />
}