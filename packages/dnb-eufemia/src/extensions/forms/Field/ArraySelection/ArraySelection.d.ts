import React from 'react';
import type { FieldBlockWidth } from '../../FieldBlock';
import type { ReturnAdditional } from '../../hooks/useFieldProps';
import type { DefaultErrorMessages, FieldProps, Path } from '../../types';
import type { Data } from '../Selection';
import type { CheckboxProps } from '../../../../components/Checkbox';
import type { ToggleButtonProps } from '../../../../components/ToggleButton';
type OptionValue = string | number;
type RenderArraySelectionChildren = (params: {
    value: Props['value'];
    options: Props['data'];
}) => React.ReactNode;
export type Props = FieldProps<Array<OptionValue> | undefined> & {
    children?: React.ReactNode | RenderArraySelectionChildren;
    variant?: 'checkbox' | 'button' | 'checkbox-button';
    optionsLayout?: 'horizontal' | 'vertical';
    /**
     * The width of the component.
     */
    width?: FieldBlockWidth;
    /**
     * The path to the context data (Form.Handler).
     * The context data object needs to have a `value` and a `title` property.
     */
    dataPath?: Path;
    /**
     * Data to be used for the component. The object needs to have a `value` and a `title` property.
     * The generated options will be placed above given JSX based children.
     */
    data?: Data;
    /**
     * The size of the component.
     */
    size?: ToggleButtonProps['size'] | CheckboxProps['size'];
    errorMessages?: DefaultErrorMessages & {
        minItems?: string;
        maxItems?: string;
    };
};
declare function ArraySelection(props: Props): import("react/jsx-runtime").JSX.Element;
export declare function useCheckboxOrToggleOptions({ id, path, variant, info, warning, emptyValue, htmlAttributes, dataList, children, value, disabled, size, hasError, handleChange, handleActiveData, }: {
    id: Props['id'];
    path?: Props['path'];
    variant?: Props['variant'];
    info?: Props['info'];
    warning?: Props['warning'];
    emptyValue?: Props['emptyValue'];
    htmlAttributes?: Props['htmlAttributes'];
    dataList?: Props['data'];
    children?: React.ReactNode;
    value?: Props['value'];
    disabled?: Props['disabled'];
    size?: Props['size'];
    hasError?: ReturnAdditional<Props['value']>['hasError'];
    handleChange?: ReturnAdditional<Props['value']>['handleChange'];
    handleActiveData?: (item: {
        labels: React.ReactNode[];
    }) => void;
}): any[];
export default ArraySelection;
