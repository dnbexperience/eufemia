import type { Path } from '../types';
import type { ContextState } from '../DataContext/Context';
export type Props<Value> = {
    path?: Path | undefined;
    value?: Value;
};
export type GetValueByPath<Value = unknown> = <T = Value>(path: Path) => T;
export default function useDataValue<Value>(pathProp?: Path | undefined, value?: Value): {
    getSourceValue: (source: Path | Value) => any;
    getValueByPath: (path: Path, data?: ContextState["data"]) => any;
    getValueByIteratePath: (path: Path) => any;
    moveValueToPath: <T>(path: Path, value: T, object?: {}) => T;
    getData: (path: Path, options?: {
        includeCurrentPath?: boolean;
    }) => any;
    value: Value;
};
