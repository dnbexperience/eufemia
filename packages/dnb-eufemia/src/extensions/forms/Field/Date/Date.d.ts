import React from 'react';
import type { FieldProps, Validator, ValidatorWithCustomValidators } from '../../types';
import type { DatePickerProps } from '../../../../components/DatePicker';
export type DateValidator = ValidatorWithCustomValidators<string, {
    dateValidator: Validator<string>;
}>;
export type DateProps = Omit<FieldProps<string, undefined | string>, 'onBlurValidator'> & {
    pattern?: string;
    /**
     * Defines if the Date field should support a value of two dates (starting and ending date).
     * The value needs to be a string containing two dates, separated by a pipe character (`|`) i.e. (`01-09-2024|30-09-2024`) when this is set to `true`.
     * Defaults to `false`.
     */
    range?: DatePickerProps['range'];
    /**
     * If the input fields with the mask should be visible. Defaults to `true`.
     */
    showInput?: DatePickerProps['showInput'];
    /**
     * If set to `true`, a cancel button will be shown. You can change the default text by using `cancelButtonText="Avbryt"` Defaults to `true`. If the `range` prop is `true`, then the cancel button is shown.
     */
    showCancelButton?: DatePickerProps['showCancelButton'];
    /**
     * If set to `true`, a reset button will be shown. You can change the default text by using `resetButtonText="Tilbakestill"` Defaults to `true`.
     */
    showResetButton?: DatePickerProps['showResetButton'];
    onBlurValidator?: DateValidator | false;
} & Pick<DatePickerProps, 'month' | 'startMonth' | 'endMonth' | 'minDate' | 'maxDate' | 'maskOrder' | 'maskPlaceholder' | 'dateFormat' | 'returnFormat' | 'hideNavigation' | 'hideDays' | 'onlyMonth' | 'hideLastWeek' | 'disableAutofocus' | 'showSubmitButton' | 'submitButtonText' | 'cancelButtonText' | 'resetButtonText' | 'firstDay' | 'link' | 'size' | 'sync' | 'addonElement' | 'shortcuts' | 'open' | 'direction' | 'alignPicker' | 'onDaysRender' | 'onType' | 'onOpen' | 'onClose' | 'onSubmit' | 'onCancel' | 'onReset' | 'skipPortal' | 'yearNavigation'>;
declare function DateComponent(props: DateProps): React.ReactElement;
export declare function parseRangeValue(value: DateProps['value']): Array<string | null>;
export default DateComponent;
