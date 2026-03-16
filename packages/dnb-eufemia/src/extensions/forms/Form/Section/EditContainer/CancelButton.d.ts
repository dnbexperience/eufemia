import React from 'react';
import { Button } from '../../../../../components';
type Props = React.ComponentProps<typeof Button> & {
    showConfirmDialog?: boolean;
};
export default function CancelButton({ showConfirmDialog, ...buttonProps }: Props): import("react/jsx-runtime").JSX.Element;
export {};
