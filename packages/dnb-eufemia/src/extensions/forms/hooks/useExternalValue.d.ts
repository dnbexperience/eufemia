import type { FieldProps, Path } from '../types';
export type Props<Value> = {
    path?: Path | undefined;
    itemPath?: Path;
    value?: Value;
    transformers?: React.RefObject<{
        fromExternal: FieldProps<Value>['fromExternal'];
    }>;
    emptyValue?: FieldProps<Value>['emptyValue'];
};
export default function useExternalValue<Value>(props: Props<Value>): unknown;
