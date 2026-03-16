import type { FieldProps, Validator, ValidatorWithCustomValidators } from '../../types';
import type { MultiInputMaskProps } from '../../../../components/input-masked';
export type ExpiryValidator = ValidatorWithCustomValidators<string, {
    expiryValidator: Validator<string>;
}>;
export type ExpiryProps = Omit<FieldProps<string, undefined | ''>, 'width' | 'contentWidth'> & {
    /**
     * The size of the component.
     */
    size?: MultiInputMaskProps<'month' | 'year'>['size'];
};
declare function Expiry(props?: ExpiryProps): import("react/jsx-runtime").JSX.Element;
declare namespace Expiry {
    var _supportsEufemiaSpacingProps: boolean;
}
export default Expiry;
