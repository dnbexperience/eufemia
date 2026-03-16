/**
 * Web Autocomplete Component
 */
import React from 'react';
import type { DrawerListProps, DrawerListData, DrawerListOptionsRender, DrawerListSuffix, DrawerListDataArrayObject } from '../../fragments/DrawerList';
import type { ButtonIconPosition } from '../Button';
import type { FormStatusBaseProps } from '../FormStatus';
import type { IconIcon, IconSize } from '../Icon';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
export type AutocompleteClearEvent = {
    value: string;
    previousValue: string | number | null;
    event: React.SyntheticEvent | Event;
};
type AutocompleteMode = 'sync' | 'async';
type AutocompleteAlign = 'left' | 'right';
type FormLabelLabelDirection = 'horizontal' | 'vertical';
type AutocompleteTitle = string | React.ReactNode;
type AutocompletePlaceholder = string | React.ReactNode;
type AutocompleteNoOptions = React.ReactNode;
type AutocompleteShowAll = string | React.ReactNode;
type AutocompleteAriaLiveOptions = string | React.ReactNode;
type AutocompleteIndicatorLabel = string | React.ReactNode;
type AutocompleteSubmitButtonIcon = string | React.ReactNode | ((...args: any[]) => any);
type AutocompleteInputRef = ((...args: any[]) => any) | React.RefObject<HTMLInputElement | undefined>;
type AutocompleteInputIcon = string | React.ReactNode | ((...args: any[]) => any);
type AutocompleteInputElement = ((...args: any[]) => any) | React.ReactNode;
type AutocompleteSearchInWordIndex = string | number;
type AutocompleteSearchMatch = 'word' | 'starts-with';
export type AutocompleteData = DrawerListData;
export type AutocompleteOptionsRender = DrawerListOptionsRender;
export type AutocompleteEventMethods = {
    attributes: Record<string, unknown>;
    dataList: DrawerListData;
    updateData: (data: DrawerListData) => void;
    revalidateSelectedItem: () => void;
    revalidateInputValue: () => void;
    resetSelectedItem: () => void;
    clearInputValue: () => void;
    showAllItems: () => void;
    setVisible: () => void;
    resetInputValue: () => void;
    setHidden: () => void;
    emptyData: () => void;
    focusInput: () => void;
    setInputValue: (value: string) => void;
    showNoOptionsItem: () => void;
    showIndicatorItem: () => void;
    showIndicator: () => void;
    hideIndicator: () => void;
    setMode: (mode: 'sync' | 'async') => void;
    debounce: (func: (...args: any[]) => any, props?: Record<string, unknown>, wait?: number) => void;
};
export type AutocompleteTypeEvent = {
    value: string;
    event: React.ChangeEvent<HTMLInputElement>;
    data?: DrawerListDataArrayObject | string | null;
} & AutocompleteEventMethods;
export type AutocompleteFocusEvent = {
    value: string;
    event: React.FocusEvent<HTMLInputElement>;
} & AutocompleteEventMethods;
export type AutocompleteBlurEvent = {
    value?: string;
    event?: React.FocusEvent<HTMLInputElement>;
    data?: DrawerListDataArrayObject | string | null;
    selectedItem?: number | string;
} & AutocompleteEventMethods;
export type AutocompleteChangeEvent = {
    value?: string;
    event?: React.FocusEvent<HTMLInputElement>;
    data: DrawerListDataArrayObject | string | null;
    selectedItem?: number | string;
} & AutocompleteEventMethods;
export type AutocompleteSelectEvent = {
    activeItem: number | string;
    selectedItem?: number | string | null;
    value: string | number;
    data: DrawerListDataArrayObject | string | null;
    event: React.SyntheticEvent;
} & AutocompleteEventMethods;
export type AutocompleteProps = {
    /**
     * If set to `async`, it prevents showing the "no options" message during typing / filtering. Defaults to `sync`.
     */
    mode?: AutocompleteMode;
    /**
     * Give a title to let the user know what they have to do.
     */
    title?: AutocompleteTitle;
    /**
     * Pre-filled placeholder text in the input.
     */
    placeholder?: AutocompletePlaceholder;
    /**
     * Text shown in the "no options" item. If set to `false`, the list will not be rendered when there are no options.
     */
    noOptions?: AutocompleteNoOptions;
    /**
     * Text that lets a user unravel all the available options.
     */
    showAll?: AutocompleteShowAll;
    /**
     * Text read out by screen readers to announce number of options.
     */
    ariaLiveOptions?: AutocompleteAriaLiveOptions;
    /**
     * Text shown on indicator item.
     */
    indicatorLabel?: AutocompleteIndicatorLabel;
    /**
     * Screen-reader title for the button that opens options.
     */
    showOptionsSr?: string;
    /**
     * Label used to announce the selected item for screen readers.
     */
    selectedSr?: string;
    /**
     * If set to `true`, the whole input value gets selected on focus.
     */
    selectAll?: boolean;
    /**
     * Title on submit button.
     */
    submitButtonTitle?: string;
    /**
     * The icon used in the submit button.
     */
    submitButtonIcon?: AutocompleteSubmitButtonIcon;
    /**
     * React ref for access to the input DOM element.
     */
    inputRef?: AutocompleteInputRef;
    /**
     * Icon to be included in the autocomplete input.
     */
    icon?: IconIcon;
    /**
     * Change icon size.
     */
    iconSize?: IconSize;
    /**
     * Icon position inside autocomplete.
     */
    iconPosition?: ButtonIconPosition;
    /**
     * Same as `icon`.
     */
    inputIcon?: AutocompleteInputIcon;
    /**
     * Prepends the form label.
     */
    label?: React.ReactNode;
    /**
     * Set `vertical` to change label layout direction.
     */
    labelDirection?: FormLabelLabelDirection;
    /**
     * Makes label readable by screen readers only.
     */
    labelSrOnly?: boolean;
    /**
     * Keep typed value on blur even when invalid.
     */
    keepValue?: boolean;
    /**
     * Keep selected item on blur when input value is empty.
     */
    keepSelection?: boolean;
    /**
     * Keep typed value and selected item on blur.
     */
    keepValueAndSelection?: boolean;
    /**
     * Show clear button inside input.
     */
    showClearButton?: boolean;
    /**
     * Keep highlighting but disable filtering.
     */
    disableFilter?: boolean;
    /**
     * Disable reordering of search results.
     */
    disableReorder?: boolean;
    /**
     * Disable highlighting but keep filtering.
     */
    disableHighlighting?: boolean;
    /**
     * Show autocomplete submit/toggle button.
     */
    showSubmitButton?: boolean;
    /**
     * Replace submit button with a custom element.
     */
    submitElement?: React.ReactNode;
    /**
     * Change options alignment.
     */
    align?: AutocompleteAlign;
    /**
     * Provide a custom input element.
     */
    inputElement?: AutocompleteInputElement;
    /**
     * Threshold deciding from which word to search inside words.
     */
    searchInWordIndex?: AutocompleteSearchInWordIndex;
    /**
     * Search matching mode.
     */
    searchMatch?: AutocompleteSearchMatch;
    /**
     * Better number searching/filtering behavior.
     */
    searchNumbers?: boolean;
    /**
     * Auto-open list on focus.
     */
    openOnFocus?: boolean;
    disabled?: boolean;
    /**
     * Stretch to full available width.
     */
    stretch?: boolean;
    /**
     * Show skeleton loading overlay.
     */
    skeleton?: SkeletonShow;
    /**
     * Additional content rendered as suffix.
     */
    suffix?: DrawerListSuffix;
    /**
     * Custom class for internal drawer list.
     */
    drawerClass?: string;
    /**
     * Selected value.
     */
    value?: string | number;
    /**
     * Initial selected value.
     */
    defaultValue?: string | number;
    /**
     * Controlled input value.
     */
    inputValue?: string;
    size?: DrawerListProps['size'];
    data?: DrawerListData;
    /**
     * Will be called once the Autocomplete shows up.
     */
    onOpen?: (event: AutocompleteTypeEvent) => void;
    /**
     * Will be called once the Autocomplete gets closed.
     */
    onClose?: (event: AutocompleteTypeEvent) => void;
    onType?: (event: AutocompleteTypeEvent) => void;
    onFocus?: (event: AutocompleteFocusEvent) => void;
    onBlur?: (event: AutocompleteBlurEvent) => void;
    onChange?: (event: AutocompleteChangeEvent) => void;
    onSelect?: (event: AutocompleteSelectEvent) => void;
    onClear?: (event: AutocompleteClearEvent) => void;
};
export type AutocompleteAllProps = AutocompleteProps & FormStatusBaseProps & DrawerListProps & SpacingProps & Omit<React.HTMLProps<HTMLElement>, 'ref' | 'size' | 'label' | 'title' | 'placeholder' | 'data' | 'children' | 'onChange' | 'onFocus' | 'onOpen' | 'onClose' | 'onSelect' | 'onResize' | 'onBlur'>;
declare function Autocomplete(props: AutocompleteAllProps): import("react/jsx-runtime").JSX.Element;
declare namespace Autocomplete {
    var HorizontalItem: typeof import("../../fragments/drawer-list/DrawerListItem").DrawerListHorizontalItem;
}
export default Autocomplete;
