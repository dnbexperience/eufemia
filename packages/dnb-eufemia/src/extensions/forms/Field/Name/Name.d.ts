import type { Props as StringFieldProps } from '../String';
import type { Validator, ValidatorWithCustomValidators } from '../../types';
export type NameValidator = ValidatorWithCustomValidators<string, {
    nameValidator: Validator<string>;
}>;
export type CompanyNameValidator = ValidatorWithCustomValidators<string, {
    companyValidator: Validator<string>;
}>;
export type Props = Omit<StringFieldProps, 'onBlurValidator'> & {
    onBlurValidator?: NameValidator | false;
};
export declare const namePattern = "^(?!.*[-\\s]{2})[\\p{L}]([\\p{L}\\p{M}\\p{Zs}-]*[\\p{L}])?$";
export declare const companyPattern = "^(?!.*[-\\s]{2})(?!.*[\\.]{2})[\\p{L}\\p{N}]([\\p{L}\\p{N}\\p{P}\\p{Zs}.]*[\\p{L}\\p{N}])?$";
declare function Name(props: Props): import("react/jsx-runtime").JSX.Element;
declare namespace Name {
    var First: (props: Props) => import("react/jsx-runtime").JSX.Element;
    var Last: (props: Props) => import("react/jsx-runtime").JSX.Element;
    var Company: (props: Props) => import("react/jsx-runtime").JSX.Element;
}
export default Name;
