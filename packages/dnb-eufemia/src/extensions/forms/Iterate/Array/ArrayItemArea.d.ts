import type { Props as CardProps } from '../../../../components/card/Card';
import type { HeightAnimationProps } from '../../../../components/HeightAnimation';
import type { Props as FlexContainerProps } from '../../../../components/flex/Container';
import type { ContainerMode } from './types';
export type ArrayItemAreaProps = {
    /**
     * Defines the variant of the ViewContainer, EditContainer or PushContainer. Can be `outline`, `filled` or `basic`.
     * Defaults to `outline`.
     */
    variant?: 'outline' | 'basic' | 'filled';
    toolbarVariant?: 'minimumOneItem' | 'custom';
} & Omit<CardProps, 'onAnimationEnd' | 'data'>;
export type Props = {
    mode: ContainerMode;
    open?: boolean | undefined;
    ariaLabel?: string;
    openDelay?: number;
} & ArrayItemAreaProps & Pick<HeightAnimationProps, 'onAnimationEnd'>;
declare function ArrayItemArea(props: Props & Omit<FlexContainerProps, 'onAnimationEnd'>): import("react/jsx-runtime").JSX.Element;
export default ArrayItemArea;
