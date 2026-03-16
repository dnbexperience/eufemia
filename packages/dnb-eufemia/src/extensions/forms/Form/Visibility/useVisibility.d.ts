import type { Props } from './Visibility';
export type { Props };
export default function useVisibility(props?: Partial<Props>): {
    check: ({ visible, visibleWhen, visibleWhenNot, pathDefined, pathUndefined, pathTruthy, pathFalsy, pathTrue, pathFalse, inferData, filterData, }?: Partial<Props>) => boolean;
};
