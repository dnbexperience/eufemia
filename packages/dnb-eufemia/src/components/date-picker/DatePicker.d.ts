/**
 * Web DatePicker Component
 *
 */
import React from 'react';
import type { FormStatusBaseProps } from '../form-status/FormStatus';
import type { ReturnObject } from './DatePickerProvider';
import type { DatePickerAddonProps } from './DatePickerAddon';
import type { SpacingProps } from '../space/types';
import type { InputInputElement, InputSize } from '../Input';
import type { SkeletonShow } from '../Skeleton';
import type { CalendarDay, DatePickerCalendarProps } from './DatePickerCalendar';
import type { DateType } from './DatePickerContext';
import type { DatePickerDates } from './hooks/useDates';
export type DatePickerEventAttributes = {
    day?: string;
    year?: string;
    start?: string;
    end?: string;
} & Record<string, unknown>;
export type DatePickerEvent<T> = ReturnObject<T>;
type FocusOnClose = {
    focusOnClose?: boolean | string;
};
export type DisplayPickerEvent = (React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLElement> | MouseEvent | KeyboardEvent | FocusOnClose) & DatePickerDates & FocusOnClose & {
    event?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>;
};
export type DatePickerProps = {
    /**
     * Defines the pre-filled date by either a JavaScript DateInstance or (ISO 8601) like `date="2019-05-05"`.
     */
    date?: DateType;
    /**
     * To set the pre-filled starting date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `maskPlaceholder`.
     */
    startDate?: DateType;
    /**
     * To set the pre-filled ending date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `maskPlaceholder`.
     */
    endDate?: DateType;
    /**
     * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.
     */
    month?: DateType;
    /**
     * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.
     */
    startMonth?: DateType;
    /**
     * To display what month should be shown in the second calendar by default. Defaults to the `date` respective `startDate`.
     */
    endMonth?: DateType;
    /**
     * To limit a date range to a minimum `startDate`. Defaults to `null`.
     */
    minDate?: DateType;
    /**
     * To limit a date range to a maximum `endDate`. Defaults to `null`.
     */
    maxDate?: DateType;
    /**
     * To define the order of the masked placeholder input fields. Defaults to `dd/mm/yyyy`
     */
    maskOrder?: string;
    /**
     * To display the placeholder on input. Defaults to `dd/mm/åååå`.
     */
    maskPlaceholder?: string;
    /**
     * Defines how the prop dates (`date`, `startDate` and `endDate`) should be parsed, e.g. `yyyy/MM/dd`. Defaults to `yyyy-MM-dd`.
     */
    dateFormat?: string;
    /**
     * Defines how the returned date, as a string, should be formatted as. Defaults to `yyyy-MM-dd`.
     */
    returnFormat?: string;
    /**
     * If set to `true`, the navigation will be hidden. Defaults to `false`.
     */
    hideNavigation?: boolean;
    /**
     * If set to `true`, the week days will be hidden. Defaults to `false`.
     */
    hideDays?: boolean;
    /**
     * Use `true` to only show the defined month. Disables the month navigation possibility. Defaults to `false`.
     */
    onlyMonth?: boolean;
    /**
     * Use `true` to only show the last week in the current month if it needs to be shown. The result is that there will mainly be shows five (5) weeks (rows) instead of six (6). Defaults to `false`.
     */
    hideLastWeek?: boolean;
    /**
     * Once the date picker gets opened, there is a focus handling to ensure good accessibility. can be disabled with property. Defaults to `false`.
     */
    disableAutofocus?: boolean;
    enableKeyboardNav?: boolean;
    /**
     * If the input fields with the mask should be visible. Defaults to `false`.
     */
    showInput?: boolean;
    /**
     * If set to `true`, renders the calendar inline without a button or input. The calendar is always visible and not wrapped in a Popover. Defaults to `false`.
     */
    inline?: boolean;
    /**
     * If set to `true`, a submit button will be shown. You can change the default text by using `submitButtonText="Ok"`. Defaults to `false`. If the `range` prop is `true`, then the submit button is shown.
     */
    showSubmitButton?: boolean;
    /**
     * If set to `true`, a cancel button will be shown. You can change the default text by using `cancelButtonText="Avbryt"` Defaults to `false`. If the `range` prop is `true`, then the cancel button is shown.
     */
    showCancelButton?: boolean;
    /**
     * If set to `true`, a reset button will be shown. You can change the default text by using `resetButtonText="Tilbakestill"` Defaults to `false`.
     */
    showResetButton?: boolean;
    submitButtonText?: string;
    cancelButtonText?: string;
    resetButtonText?: string;
    resetDate?: boolean;
    /**
     * To define the first day of the week. Defaults to `monday`.
     */
    firstDay?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    /**
     * If the date picker should support a range of two dates (starting and ending date). Defaults to `false`.
     */
    range?: boolean;
    /**
     * Link both calendars, once to the user is navigating between months. Only meant to use if the range is set to `true`. Defaults to `false`.
     */
    link?: boolean;
    /**
     * Sync input values with the calendars views. Once the input values get changed, the calendar changes its views in sync. Defaults to `true`.
     */
    sync?: boolean;
    /**
     * A prepending label in sync with the date input field.
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
     * Gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `inputElement="input"`, a React element, or a render function `inputElement={(internalProps) => (<Return />)}`. Can also be used in circumstances where the `react-text-mask` not should be used, e.g. in testing environments. Defaults to custom masked input.
     */
    inputElement?: InputInputElement;
    /**
     * Gives you the possibility to inject a React element showing up over the footer. Use it to customize `shortcuts`.
     */
    addonElement?: React.ReactNode;
    /**
     * Gives you the possibility to set predefined dates and date ranges so the user can select these by one click. Define either a JSON or an object with the defined shortcuts. More info is below.
     */
    shortcuts?: DatePickerAddonProps['shortcuts'];
    disabled?: boolean;
    /**
     * If set to `true`, then the date-picker input field will be 100% in `width`.
     */
    stretch?: boolean;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    /**
     * The sizes you can choose is `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`.
     */
    size?: InputSize;
    /**
     * Text describing the content of the DatePicker more than the label. You can also send in a React component, so it gets wrapped inside the DatePicker component.
     */
    suffix?: React.ReactNode;
    /**
     * To open the date-picker by default. Defaults to `false`.
     */
    open?: boolean;
    /**
     * Provide a short Tooltip content that shows up on the picker button.
     */
    tooltip?: React.ReactNode;
    tabIndex?: number;
    preventClose?: boolean;
    noAnimation?: boolean;
    direction?: 'auto' | 'top' | 'bottom';
    /**
     * Use `right` to change the calendar alignment direction. Defaults to `left`.
     */
    alignPicker?: 'left' | 'center' | 'right';
    /**
     * Sets the alignment of the label. Defaults to `left`.
     */
    labelAlignment?: 'left' | 'center' | 'right';
    /**
     * If set to `true`, the calendar will not be rendered inside a react portal. Defaults to `false`.
     */
    skipPortal?: boolean;
    /**
     * Will enable year navigation in the calendar if set to `true`. Defaults to `false`.
     */
    yearNavigation?: boolean;
    className?: string;
    /**
     * Will be called right before every new calendar view gets rendered. See the example above.
     */
    onDaysRender?: (days: Array<CalendarDay>, nr?: DatePickerCalendarProps['nr']) => void;
    /**
     * Will be called on a date change event. Returns an `object`. See Returned Object below.
     */
    onChange?: (event: DatePickerEvent<React.ChangeEvent<HTMLInputElement>>) => void;
    /**
     * Will be called on every input and date picker interaction. Returns an `object`. See Returned Object below.
     */
    onType?: (event: DatePickerEvent<React.ChangeEvent<HTMLInputElement>>) => void;
    /**
     * Will be called once date-picker is visible.
     */
    onOpen?: (event: DatePickerEvent<DisplayPickerEvent>) => void;
    /**
     * Will be called once date-picker is hidden.
     */
    onClose?: (event: DatePickerEvent<DisplayPickerEvent>) => void;
    /**
     * Will be called once a user presses the submit button.
     */
    onSubmit?: (event: DatePickerEvent<React.MouseEvent<HTMLButtonElement>>) => void;
    /**
     * Will be called once a user presses the cancel button.
     */
    onCancel?: (event: DatePickerEvent<React.MouseEvent<HTMLButtonElement>>) => void;
    /**
     * Will be called once a user presses the reset button.
     */
    onReset?: (event: DatePickerEvent<React.MouseEvent<HTMLButtonElement>>) => void;
    /**
     * Will be called once the input gets focus.
     */
    onFocus?: (event: DatePickerEvent<React.FocusEvent<HTMLElement>>) => void;
    /**
     * Will be called once the input lose focus.
     */
    onBlur?: (event: DatePickerEvent<React.FocusEvent<HTMLElement>>) => void;
};
export type DatePickerAllProps = DatePickerProps & FormStatusBaseProps & SpacingProps & Omit<React.HTMLProps<HTMLElement>, 'ref' | 'children' | 'label' | 'size' | 'onChange' | 'onBlur' | 'onFocus' | 'onSubmit' | 'onReset' | 'start'>;
declare function DatePicker(externalProps: DatePickerAllProps): import("react/jsx-runtime").JSX.Element;
export default DatePicker;
