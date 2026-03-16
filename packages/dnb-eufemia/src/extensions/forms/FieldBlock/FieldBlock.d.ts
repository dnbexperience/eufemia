import React from 'react';
import type { StateWithMessage, StateMessage, StateTypes, FieldBlockContextProps } from './FieldBlockContext';
import type { ComponentProps, FieldProps, SubmitState } from '../types';
import type { HelpProps } from '../../../components/help-button/HelpButtonInline';
export declare const states: Array<StateTypes>;
/**
 * The width of a field block
 */
export type CustomWidth = `${number}rem`;
export type FieldBlockWidth = false | 'small' | 'medium' | 'large' | 'stretch' | CustomWidth;
export type FieldBlockHorizontalLabelWidth = 'small' | 'medium' | 'large' | CustomWidth;
export type FieldBlockHorizontalLabelHeight = 'default' | 'small' | 'medium' | 'large';
export type SharedFieldBlockProps = {
    /**
     * The layout of the field block
     */
    layout?: 'vertical' | 'horizontal';
    /** Use this to set additional options for the layout */
    layoutOptions?: {
        width?: FieldBlockHorizontalLabelWidth;
        minWidth?: FieldBlockHorizontalLabelWidth;
        maxWidth?: FieldBlockHorizontalLabelWidth;
    };
    /**
     * Main label text for the field
     */
    label?: React.ReactNode;
    /**
     * Use `true` to make the label only readable by screen readers.
     */
    labelSrOnly?: boolean;
    /**
     * Will append an additional text to the label, like "(optional)" or "(recommended)"
     */
    labelSuffix?: React.ReactNode;
    /**
     * A more discreet text displayed beside the label
     */
    labelDescription?: React.ReactNode;
    /**
     * If true, the labelDescription will be displayed on the same line as the label.
     */
    labelDescriptionInline?: boolean;
    /**
     * Define the font-size of the label based on the [heading sizes](/uilib/elements/heading/) table.
     */
    labelSize?: 'medium' | 'large';
    /**
     * Width of outer block element
     */
    width?: FieldBlockWidth;
    /**
     * Width of contents block, while label etc can be wider if space is available
     */
    contentWidth?: FieldBlockWidth;
    /**
     * Provide help content for the field.
     */
    help?: HelpProps;
    /**
     * Hide the help button that is normally rendered beside the label.
     */
    hideHelpButton?: boolean;
    /**
     * Controls where status messages (error, warning, info) are visually shown.
     */
    statusPosition?: 'below' | 'above';
};
export type Props<Value = unknown> = SharedFieldBlockProps & Pick<FieldProps<Value>, keyof ComponentProps | 'info' | 'warning' | 'error' | 'disabled'> & {
    /** The id to link a element with */
    forId?: string;
    /** Use true if you have more than one form element */
    asFieldset?: boolean;
    /** Defines the layout of nested fields */
    composition?: FieldBlockContextProps['composition'];
    /** For composition only: Align the contents vertically */
    align?: 'center' | 'bottom';
    /** Class name for the contents block */
    contentClassName?: string;
    /** To show the SubmitIndicator during async validation */
    fieldState?: SubmitState;
    /** Defines the height of an component (size prop), so the label can be aligned correctly */
    labelHeight?: FieldBlockHorizontalLabelHeight;
    /** Disable the error summary for this field block */
    disableStatusSummary?: boolean;
    /** For internal use only */
    required?: boolean;
    /** Role for the fieldset element when using fieldset */
    fieldsetRole?: string;
    children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
declare function FieldBlock<Value = unknown>(props: Props<Value>): import("react/jsx-runtime").JSX.Element;
export declare function getMessagesFromError(item: Partial<StateWithMessage>): Array<StateMessage>;
export default FieldBlock;
