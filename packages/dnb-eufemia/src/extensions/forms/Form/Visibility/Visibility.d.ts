import type { AriaAttributes } from 'react';
import React from 'react';
import type { HeightAnimationAllProps } from '../../../../components/HeightAnimation';
import type { Path, UseFieldProps } from '../../types';
import type { DataAttributes } from '../../hooks/useFieldProps';
import type { FilterData } from '../../DataContext';
export type VisibleWhen = {
    path: Path;
    hasValue: unknown | ((value: unknown) => boolean);
} | {
    itemPath: Path;
    hasValue: unknown | ((value: unknown) => boolean);
} | {
    path: Path;
    isValid: boolean;
    validateContinuously?: boolean;
} | {
    itemPath: Path;
    isValid: boolean;
    validateContinuously?: boolean;
};
export type Props = {
    visible?: boolean;
    /** Given data context path must be defined to show children */
    pathDefined?: Path;
    /** Given data context path must be undefined to show children */
    pathUndefined?: Path;
    /** Given data context path must be truthy to show children */
    pathTruthy?: Path;
    /** Given data context path must be falsy to show children */
    pathFalsy?: Path;
    /** Given data context path must be true to show children */
    pathTrue?: Path;
    /** Given data context path must be false to show children */
    pathFalse?: Path;
    /** Provide a `path` or `itemPath` and a `hasValue` method that returns a boolean or the expected value in order to show children. The first parameter is the value of the path. */
    visibleWhen?: VisibleWhen;
    /** Same as `visibleWhen`, but with inverted logic. */
    visibleWhenNot?: VisibleWhen;
    /** Infer visibility calling given derivative function with the whole data set. Should return true/false for visibility.   */
    inferData?: (data: unknown) => boolean;
    /** Filter data based on provided criteria. The first parameter is the path, the second is the value, and the third is the props, and the fourth is the internal. Return false to filter out the data. */
    filterData?: FilterData;
    /** Callback for when the content gets visible. */
    onVisible?: HeightAnimationAllProps['onOpen'];
    /** When visibility is hidden, and `keepInDOM` is true, pass these props to the children */
    fieldPropsWhenHidden?: UseFieldProps & DataAttributes & AriaAttributes;
    children: React.ReactNode;
    /** For internal use only. Used by "Iterate.Visibility" */
    withinIterate?: boolean;
} & Pick<HeightAnimationAllProps, 'onAnimationEnd' | 'animate' | 'keepInDOM' | 'element' | 'compensateForGap'>;
declare function Visibility(props: Props): import("react/jsx-runtime").JSX.Element;
export default Visibility;
