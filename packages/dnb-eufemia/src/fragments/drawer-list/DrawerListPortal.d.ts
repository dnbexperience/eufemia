/**
 * Web DrawerList Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react';
export type DrawerListPortalProps = {
    id: string;
    children: React.ReactNode;
    open: boolean;
    ref?: React.Ref<HTMLSpanElement>;
    rootRef: React.RefObject<HTMLSpanElement>;
    includeOwnerWidth?: boolean;
    independentWidth?: boolean;
    fixedPosition?: boolean;
    skipPortal?: boolean;
    className?: string;
};
declare function DrawerListPortal({ ref: refProp, id, open, rootRef, includeOwnerWidth, independentWidth, fixedPosition, skipPortal, className, children, }: DrawerListPortalProps): string | number | bigint | boolean | import("react/jsx-runtime").JSX.Element | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode>>;
export default DrawerListPortal;
