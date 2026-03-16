import type { FieldPropsWithExtraValue, Validator, ValidatorWithCustomValidators } from '../../types';
export type AdditionalArgs = {
    day: string;
    month: string;
    year: string;
};
export type DateOfBirthValidator = ValidatorWithCustomValidators<string, {
    dateOfBirthValidator: Validator<string>;
}>;
export type Props = Omit<FieldPropsWithExtraValue<string, AdditionalArgs, undefined | string>, 'layout' | 'layoutOptions'> & {
    validate?: boolean;
    dateFormat?: string;
    onDayChange?: (value: string | undefined) => void;
    onMonthChange?: (value: string | undefined) => void;
    onYearChange?: (value: string | undefined) => void;
    onBlurValidator?: DateOfBirthValidator | false;
};
export declare const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
declare function DateOfBirth(props: Props): import("react/jsx-runtime").JSX.Element;
export default DateOfBirth;
