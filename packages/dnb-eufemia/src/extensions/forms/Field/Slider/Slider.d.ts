import React from 'react';
import type { FieldBlockWidth } from '../../FieldBlock';
import type { FieldProps, Path } from '../../types';
import type { SliderProps } from '../../../../components/Slider';
export type SliderVisibilityEvent = React.MouseEvent<HTMLButtonElement> & {
    value: string;
};
export type SliderValue = number | Array<number>;
export type Props = FieldProps<SliderValue> & {
    /**
     * Define an array with JSON Pointers for multiple thumb buttons.
     */
    paths?: Array<Path>;
    step?: SliderProps['step'] | Path;
    min?: SliderProps['min'] | Path;
    max?: SliderProps['max'] | Path;
    vertical?: SliderProps['vertical'];
    reverse?: SliderProps['reverse'];
    hideButtons?: SliderProps['hideButtons'];
    multiThumbBehavior?: SliderProps['multiThumbBehavior'];
    thumbTitle?: SliderProps['thumbTitle'];
    subtractTitle?: SliderProps['subtractTitle'];
    addTitle?: SliderProps['addTitle'];
    numberFormat?: SliderProps['numberFormat'];
    tooltip?: SliderProps['tooltip'];
    alwaysShowTooltip?: SliderProps['alwaysShowTooltip'];
    extensions?: SliderProps['extensions'];
    /** Styling */
    width?: FieldBlockWidth;
};
declare function SliderComponent(props: Props): import("react/jsx-runtime").JSX.Element;
export default SliderComponent;
