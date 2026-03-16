/**
 * Web StepIndicator Component
 *
 */
import type { ButtonProps } from '../button/Button';
export type StepIndicatorTriggerButtonProps = ButtonProps & {
    isNested?: boolean;
    className?: string;
};
declare function StepIndicatorTriggerButton({ className, isNested, ...rest }: StepIndicatorTriggerButtonProps): import("react/jsx-runtime").JSX.Element;
export default StepIndicatorTriggerButton;
