import type { MultiInputMaskProps, MultiInputMaskValue } from '../MultiInputMask';
type UseMultiInputValues<T extends string> = {
    inputs: MultiInputMaskProps<T>['inputs'];
    defaultValues?: MultiInputMaskProps<T>['values'];
    callback?: (values: MultiInputMaskProps<T>['values']) => void;
};
export declare function useMultiInputValue<T extends string>({ inputs, defaultValues, callback, }: UseMultiInputValues<T>): readonly [MultiInputMaskValue<T>, (id: string, value: string) => void];
export {};
