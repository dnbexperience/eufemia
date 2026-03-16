import type { IterateItemContextState } from '../IterateItemContext';
export type UseItemReturn<Value = unknown> = Omit<IterateItemContextState, 'value'> & {
    value: Value;
};
export default function useItem<Value = unknown>(): UseItemReturn<Value>;
