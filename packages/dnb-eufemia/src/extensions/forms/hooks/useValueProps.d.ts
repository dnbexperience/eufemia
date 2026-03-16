import type { ValueProps } from '../types';
export type Props<Value> = ValueProps<Value>;
export default function useValueProps<Value = unknown, Props extends ValueProps<Value> = ValueProps<Value>>(localProps: Props): Props & ValueProps<Value>;
