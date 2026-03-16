import type { Props as StringFieldProps } from '../String';
import type { Validator, ValidatorWithCustomValidators } from '../../types';
export type BankAccountNumberValidator = ValidatorWithCustomValidators<string, {
    bankAccountNumberValidator: Validator<string>;
}>;
export type Props = Omit<StringFieldProps, 'onBlurValidator'> & {
    validate?: boolean;
    omitMask?: boolean;
    onBlurValidator?: BankAccountNumberValidator | false;
};
declare function BankAccountNumber(props: Props): import("react/jsx-runtime").JSX.Element;
export default BankAccountNumber;
