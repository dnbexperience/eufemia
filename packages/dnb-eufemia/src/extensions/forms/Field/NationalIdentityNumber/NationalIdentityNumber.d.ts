import type { Props as StringFieldProps } from '../String';
import type { Validator, ValidatorWithCustomValidators } from '../../types';
import { FormError } from '../../utils';
export type NationalIdentityNumberValidator = ValidatorWithCustomValidators<string, {
    dnrValidator: Validator<string>;
    fnrValidator: Validator<string>;
    dnrAndFnrValidator: Validator<string>;
}>;
export type Props = Omit<StringFieldProps, 'onBlurValidator'> & {
    omitMask?: boolean;
    validate?: boolean;
    onBlurValidator?: NationalIdentityNumberValidator | false;
};
declare function NationalIdentityNumber(props: Props): import("react/jsx-runtime").JSX.Element;
export declare function getAgeByBirthDate(birthDate: Date): number;
export declare function getBirthDateByFnrOrDnr(value: string): Date;
export declare function createMinimumAgeValidator(age: number): (value: string) => FormError;
export declare function createMinimumAgeVerifier(age: number): (value: string) => boolean;
export default NationalIdentityNumber;
