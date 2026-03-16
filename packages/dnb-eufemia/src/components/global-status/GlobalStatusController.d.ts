/**
 * Web GlobalStatus Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react';
import GlobalStatusProvider from './GlobalStatusProvider';
import type { GlobalStatusAddProps, GlobalStatusInterceptorProps } from './GlobalStatus';
export declare class GlobalStatusInterceptor {
    provider: ReturnType<typeof GlobalStatusProvider.init>;
    statusId: string | undefined;
    constructor(props: GlobalStatusInterceptorProps);
    add(props: Partial<GlobalStatusAddProps>): {
        [key: string]: any;
        statusId?: string;
        items?: {
            [key: string]: any;
            itemId?: string;
            text?: any;
        }[];
    };
    update(props: Record<string, unknown>): void;
    remove(): void;
}
interface GlobalStatusControllerProps {
    id?: string;
    statusId?: string;
    removeOnUnmount?: boolean;
    [key: string]: unknown;
}
interface GlobalStatusControllerState {
    provider?: ReturnType<typeof GlobalStatusProvider.init>;
    statusId?: string;
    _props?: GlobalStatusControllerProps;
}
declare class GlobalStatusController extends React.PureComponent<GlobalStatusControllerProps, GlobalStatusControllerState> {
    static Remove: typeof GlobalStatusRemove;
    static Update: typeof GlobalStatusController;
    static defaultProps: {
        id: string;
        statusId: any;
        removeOnUnmount: boolean;
    };
    static getDerivedStateFromProps(props: GlobalStatusControllerProps, state: GlobalStatusControllerState): GlobalStatusControllerState;
    state: GlobalStatusControllerState;
    constructor(props: GlobalStatusControllerProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): any;
}
interface GlobalStatusRemovePropsLocal {
    id?: string;
    statusId?: string;
    [key: string]: unknown;
}
interface GlobalStatusRemoveState {
    provider?: ReturnType<typeof GlobalStatusProvider.init>;
    _props?: GlobalStatusRemovePropsLocal;
}
declare class GlobalStatusRemove extends React.PureComponent<GlobalStatusRemovePropsLocal, GlobalStatusRemoveState> {
    static defaultProps: {
        id: string;
    };
    static getDerivedStateFromProps(props: GlobalStatusRemovePropsLocal, state: GlobalStatusRemoveState): GlobalStatusRemoveState;
    state: GlobalStatusRemoveState;
    constructor(props: GlobalStatusRemovePropsLocal);
    componentDidMount(): void;
    render(): any;
}
export default GlobalStatusController;
export { GlobalStatusRemove };
