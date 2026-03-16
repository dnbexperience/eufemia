import type { ValueProps } from '../../types';
import type { NumberFormatProps } from '../../../../components/NumberFormat';
import type { SpacingProps } from '../../../../shared/types';
export type Props = Omit<ValueProps<number>, 'defaultValue'> & Omit<NumberFormatProps, keyof SpacingProps> & Partial<{
    defaultValue?: number | string;
    minimum?: number;
    maximum?: number;
}>;
declare function NumberValue(props: Props): import("react/jsx-runtime").JSX.Element;
export default NumberValue;
