/**
 * HTML Element
 *
 */
import React from 'react';
import type { IconIcon } from '../icon/Icon';
import type { SkeletonShow } from '../skeleton/Skeleton';
import type { DynamicElement, SpacingProps } from '../../shared/types';
type ReactRouterLink = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    to: string | {
        pathname?: string;
        search?: string;
        has?: string;
    };
};
export type AnchorProps = {
    element?: DynamicElement<HTMLAnchorElement | AnchorAllProps> | React.ComponentType<ReactRouterLink & {
        ref?: React.Ref<HTMLAnchorElement>;
    }>;
    href?: string;
    to?: string;
    targetBlankTitle?: string;
    target?: string;
    tooltip?: React.ReactNode;
    icon?: IconIcon;
    iconPosition?: 'left' | 'right';
    skeleton?: SkeletonShow;
    omitClass?: boolean;
    ref?: React.Ref<HTMLAnchorElement>;
    /**
     * Removes default animation.
     * Default: `false`
     */
    noAnimation?: boolean;
    /**
     * Removes default styling.
     * Default: `false`
     */
    noStyle?: boolean;
    /**
     * Removes default hover style.
     * Default: `false`
     */
    noHover?: boolean;
    /**
     * Removes underline.
     * Default: `false`
     */
    noUnderline?: boolean;
    /**
     * Removes Icon.
     * Default: `false`
     */
    noIcon?: boolean;
    /**
     * Removes Launch Icon.
     * Default: `false`
     */
    noLaunchIcon?: boolean;
    /**
     * Disables the Anchor element.
     * Default: `false`
     */
    disabled?: boolean;
    /**
     * Changes component style based on background.
     * Default: `undefined`
     */
    surface?: 'dark';
};
export type AnchorAllProps = AnchorProps & Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'> & SpacingProps;
export declare function AnchorInstance(localProps: AnchorAllProps): import("react/jsx-runtime").JSX.Element;
declare function Anchor(props: AnchorAllProps): import("react/jsx-runtime").JSX.Element;
export default Anchor;
export declare function scrollToHash(hash: string): {
    element: HTMLElement;
};
export declare function pickIcon(icon: any, className?: string): React.CElement<any, React.Component<any, any, any>>;
export declare const opensNewTab: (target: string, href: string) => boolean;
