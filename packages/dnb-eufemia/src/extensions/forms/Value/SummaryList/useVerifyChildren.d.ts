export declare function useVerifyChildren({ children, message, messageInfo, ignoreTypes, }: {
    ignoreTypes?: Array<string>;
    messageInfo?: unknown;
    children: React.ReactNode;
    message: string;
}): {
    verifyChild: () => void;
};
/**
 * Count the children of a React node,
 * without counting React.Fragment or primitive nodes.
 */
export declare const countChildren: (children: React.ReactNode, ignoreTypes?: Array<string>, count?: number) => any;
