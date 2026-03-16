/**
 * Web Dropdown Component
 */
import React from 'react';
import type { ButtonIconPosition, ButtonVariant } from '../Button';
import type { FormStatusBaseProps } from '../FormStatus';
import type { IconIcon, IconSize } from '../Icon';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import type { DrawerListProps, DrawerListData, DrawerListSuffix } from '../../fragments/DrawerList';
export type DropdownData = DrawerListData;
type DropdownTitle = string | React.ReactNode;
type DropdownAlign = 'left' | 'right';
type DropdownTriggerElement = ((props: Record<string, unknown>) => React.ReactNode) | React.ReactNode;
export interface DropdownProps {
    /**
     * Give a title to let the users know what they have to do. Defaults to `Valgmeny`.
     */
    title?: DropdownTitle;
    /**
     * Defines the kind of dropdown. Possible values are `primary`, `secondary`, `tertiary` and `signal`. Defaults to `secondary`.
     */
    variant?: ButtonVariant;
    /**
     * Icon to be included in the dropdown.
     */
    icon?: IconIcon;
    /**
     * Change the size of the icon pragmatically.
     */
    iconSize?: IconSize;
    /**
     * Position of the icon inside the dropdown. Set to `left` or `right`. Defaults to `right`.
     */
    iconPosition?: ButtonIconPosition;
    /**
     * Prepends the Form Label component. If no ID is provided, a random ID is created.
     */
    label?: React.ReactNode;
    /**
     * Use `labelDirection="vertical"` to change the label layout direction. Defaults to `horizontal`.
     */
    labelDirection?: 'vertical' | 'horizontal';
    /**
     * Use `true` to make the label only readable by screen readers.
     */
    labelSrOnly?: boolean;
    /**
     * By providing a React.ref you can get the internally used main element (DOM). E.g. `ref={myRef}` by using `React.useRef()`.
     */
    ref?: React.Ref<HTMLElement>;
    /**
     * By providing a React.ref you can get the internally used button element (DOM). E.g. `buttonRef={myRef}` by using `React.createRef()` or `React.useRef()`.
     */
    buttonRef?: React.Ref<HTMLElement>;
    /**
     * Same as `preventSelection`, but the "selection area" (given title) will not be visible and the icon `more` (three dots) is used. Defaults to `false`.
     */
    moreMenu?: boolean;
    /**
     * Use `right` to change the options alignment direction. Makes only sense to use in combination with `preventSelection` or `moreMenu`. Defaults to `left`.
     */
    align?: DropdownAlign;
    /**
     * Lets you provide a custom React element as the trigger HTML element.
     */
    triggerElement?: DropdownTriggerElement;
    /**
     * If set to `true`, the Dropdown will be opened when the users enter the trigger button with a focus action.
     */
    openOnFocus?: boolean;
    disabled?: boolean;
    /**
     * If set to `true`, then the dropdown will be 100% in available `width`.
     */
    stretch?: boolean;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    /**
     * Text describing the content of the Dropdown more than the label. You can also send in a React component, so it gets wrapped inside the Dropdown component.
     */
    suffix?: DrawerListSuffix;
    /**
     * Will be called once the Dropdown shows up.
     */
    onOpen?: (args: Record<string, unknown>) => void;
    /**
     * Will be called once the Dropdown gets closed.
     */
    onClose?: (args: Record<string, unknown>) => void;
    onOpenFocus?: (args: {
        element: HTMLElement;
    }) => void;
    onCloseFocus?: (args: {
        element: HTMLElement;
    }) => void;
}
export type DropdownAllProps = DropdownProps & FormStatusBaseProps & DrawerListProps & SpacingProps & Omit<React.HTMLProps<HTMLElement>, 'ref' | 'size' | 'label' | 'title' | 'placeholder' | 'data' | 'children' | 'onChange' | 'onFocus' | 'onOpen' | 'onClose' | 'onSelect' | 'onResize'>;
/**
 * Function component wrapper that provides DrawerListProvider context
 * and forwards `ref` and `buttonRef` to the inner DOM elements.
 */
declare function Dropdown({ ref, buttonRef, ...props }: DropdownAllProps): import("react/jsx-runtime").JSX.Element;
declare namespace Dropdown {
    var HorizontalItem: typeof import("../../fragments/drawer-list/DrawerListItem").DrawerListHorizontalItem;
}
export default Dropdown;
