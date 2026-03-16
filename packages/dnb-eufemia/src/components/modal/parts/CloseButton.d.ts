/**
 * Web Modal Component
 *
 */
import type { ButtonProps } from '../../button/Button';
export type CloseButtonProps = {
    /**
     * The title of the close button. Defaults to <em>Close</em> or <em>Lukk</em>.
     */
    closeTitle?: string;
} & Partial<ButtonProps>;
declare function CloseButton(props: CloseButtonProps): import("react/jsx-runtime").JSX.Element;
export default CloseButton;
