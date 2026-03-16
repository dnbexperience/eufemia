import type { Props as StringFieldProps } from '../String';
import type { Validator, ValidatorWithCustomValidators } from '../../types';
export type OrganizationNumberValidator = ValidatorWithCustomValidators<string, {
    organizationNumberValidator: Validator<string>;
}>;
export type Props = Omit<StringFieldProps, 'onBlurValidator'> & {
    validate?: boolean;
    omitMask?: boolean;
    onBlurValidator?: OrganizationNumberValidator | false;
};
declare function OrganizationNumber(props: Props): import("react/jsx-runtime").JSX.Element;
export default OrganizationNumber;
