import React from 'react';
import { getStyleScopeHash } from '../plugins/postcss-isolated-style-scope/plugin-scope-hash.js';
export { getStyleScopeHash };
export type IsolatedStyleScopeProps = {
    scopeHash?: string | 'auto';
    disableCoreStyleWrapper?: boolean;
    uniqueKey?: string | false;
    ref?: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    style?: React.CSSProperties & {
        [key: `--${string}`]: string | number;
    };
};
export declare const IsolatedStyleScopeContext: React.Context<{
    generatedScopeHash: string;
    scopeElementRef: React.RefObject<HTMLDivElement>;
    internalKeys: Set<string>;
    parentContextMap?: Map<string, any>;
} & Pick<IsolatedStyleScopeProps, "style" | "scopeHash" | "disableCoreStyleWrapper">>;
export default function IsolatedStyleScope(props: IsolatedStyleScopeProps): string | number | bigint | boolean | import("react/jsx-runtime").JSX.Element | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode>>;
export declare function getCurrentStyleScopeElement(currentElement: HTMLElement, scopeHash?: string, fallback?: any): any;
export declare function useIsolatedStyleScope(scopeHash?: string): {
    getScopeElement: () => any;
};
