import type { ComponentProps } from '../../types';
import type { ButtonProps } from '../../../../components/button/Button';
export type Props = ComponentProps & Omit<ButtonProps, 'variant'>;
declare function NextButton(props: Props): import("react/jsx-runtime").JSX.Element;
export default NextButton;
