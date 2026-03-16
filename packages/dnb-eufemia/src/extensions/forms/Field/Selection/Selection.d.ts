import React from 'react';
import type { Props as OptionFieldProps } from '../Option';
import type { FieldBlockWidth } from '../../FieldBlock';
import type { FieldProps, Path } from '../../types';
import type { FormStatusText } from '../../../../components/FormStatus';
import type { AutocompleteAllProps } from '../../../../components/Autocomplete';
import type { DropdownAllProps } from '../../../../components/Dropdown';
import type { HelpProps } from '../../../../components/help-button/HelpButtonInline';
import type { DrawerListDataArrayObjectStrict, DrawerListProps } from '../../../../fragments/DrawerList';
import type { FormError } from '../../utils';
import type { RadioProps } from '../../../../components/Radio';
import type { ToggleButtonProps } from '../../../../components/ToggleButton';
import type { RadioGroupProps } from '../../../../components/radio/RadioGroup';
import type { ToggleButtonGroupProps } from '../../../../components/toggle-button/ToggleButtonGroup';
type IOption = {
    title: string | React.ReactNode;
    value: number | string;
    status: FormStatusText;
};
export type Data = Array<{
    value: number | string;
    title: React.ReactNode;
    text?: React.ReactNode;
    disabled?: boolean;
    style?: React.CSSProperties;
    [key: string]: any;
} & Partial<DrawerListDataArrayObjectStrict>>;
type RenderSelectionChildren = (params: {
    value: IOption['value'];
    options: Props['data'];
}) => React.ReactNode;
export type Props = FieldProps<IOption['value']> & {
    /**
     * Defines the variant of the component.
     * Default: dropdown
     */
    variant?: 'dropdown' | 'autocomplete' | 'radio' | 'button';
    /**
     * The width of the component.
     * Default: large
     */
    width?: FieldBlockWidth;
    /**
     * Defines the layout of the options for radio and button variants.
     */
    optionsLayout?: 'horizontal' | 'vertical';
    /**
     * Transform the displayed selection for Dropdown and Autocomplete variant.
     * Use it to display a different value than the one in the data set.
     */
    transformSelection?: (props: OptionFieldProps) => React.ReactNode;
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
     * Array of groups, only the first can be `undefined`
     */
    groups?: React.ReactNode[];
    /**
     * Autocomplete specific props
     */
    autocompleteProps?: AutocompleteAllProps;
    /**
     * Dropdown specific props
     */
    dropdownProps?: DropdownAllProps;
    /**
     * The size of the component.
     */
    size?: ToggleButtonGroupProps['size'] | RadioGroupProps['size'] | AutocompleteAllProps['size'] | DropdownAllProps['size'];
    /**
     * The content of the component.
     */
    children?: React.ReactNode | RenderSelectionChildren;
};
declare function Selection(props: Props): import("react/jsx-runtime").JSX.Element;
type OptionProps = React.ComponentProps<(props: {
    value: Props['value'];
    error: Error | FormError | undefined;
    help: HelpProps;
    title: React.ReactNode;
    children: React.ReactNode;
    size?: ToggleButtonProps['size'] | RadioProps['size'];
}) => React.JSX.Element>;
export declare function mapOptions(children: React.ReactNode, { createOption, }: {
    createOption: (props: OptionProps, i: number) => React.ReactNode;
}): any;
export declare function makeOptions<T = DrawerListProps['data']>(children: React.ReactNode, transformSelection?: Props['transformSelection']): T;
export default Selection;
