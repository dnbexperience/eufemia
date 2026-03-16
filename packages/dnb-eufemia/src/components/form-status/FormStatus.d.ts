/**
 * Web FormStatus Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react';
import { Context } from '../../shared';
import GlobalStatusProvider from '../global-status/GlobalStatusProvider';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
import type { IconIcon, IconSize } from '../Icon';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps, SpaceTypeAll } from '../space/types';
export type FormStatusText = string | boolean | (() => React.ReactNode) | React.ReactNode;
export type FormStatusState = boolean | string | 'error' | 'warning' | 'info' | 'success' | 'marketing';
export type FormStatusVariant = 'plain' | 'outlined';
export type FormStatusSize = 'default' | 'large';
export type FormStatusAttributes = string | Record<string, unknown>;
export type FormStatusChildren = string | (() => React.ReactNode) | React.ReactNode;
/**
 * Shared status-related props used by form components that display a FormStatus.
 */
export type FormStatusBaseProps = {
    /**
     * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
     */
    status?: FormStatusText;
    /**
     * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
     */
    statusState?: FormStatusState;
    /**
     * Use an object to define additional FormStatus properties.
     */
    statusProps?: FormStatusProps;
    /**
     * Set to `true` to disable the status animation. Defaults to `false`.
     */
    statusNoAnimation?: boolean;
    /**
     * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
     */
    globalStatus?: GlobalStatusConfigObject;
};
export interface FormStatusProps extends Omit<React.HTMLProps<HTMLElement>, 'ref' | 'label' | 'value' | 'onFocus' | 'onBlur' | 'children' | 'size'>, SpacingProps {
    id?: string;
    /**
     * The `title` attribute in the status.
     */
    title?: string;
    label?: React.ReactNode;
    /**
     * Provide `false` if you want to animate the visibility. Defaults to `true`.
     */
    show?: boolean;
    /**
     * The `text` appears as the status message. Beside plain text, you can send in a React component as well.
     */
    text?: FormStatusText;
    /**
     * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
     */
    globalStatus?: GlobalStatusConfigObject;
    /**
     * The `icon` show before the status text. Defaults to `exclamation`.
     */
    icon?: IconIcon;
    /**
     * The icon size of the icon shows. Defaults to `medium`.
     */
    iconSize?: IconSize;
    /**
     * Defines the visual appearance of the status. These are the statuses `error`, `warning`, `info` and `marketing`. The default status is `error`.
     */
    state?: FormStatusState;
    /**
     * As of now, there is the `plain` and the `outlined` variant. Defaults to `plain`.
     */
    variant?: FormStatusVariant;
    /**
     * Defines the appearance size. There are these sizes `default`, `large`. The default status is `default`.
     */
    size?: FormStatusSize;
    attributes?: FormStatusAttributes;
    textId?: string;
    widthSelector?: string;
    widthElement?: {
        current: HTMLElement | null;
    } | null;
    /**
     * NB: Animation is disabled as of now. ~~use `true` to omit the animation on content visibility. Defaults to `false`.~~
     */
    noAnimation?: boolean;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    /**
     * If set to `true`, then the FormStatus will be 100% in available `width`. **NB:** Only use this on independent status messages.
     */
    stretch?: boolean;
    /**
     * The `role` attribute for accessibility, defaults to `alert`.
     */
    role?: string;
    /**
     * Use it to set an inner margin. It supports the same properties as [Space](/uilib/layout/space/properties). Useful for animation.
     */
    shellSpace?: SpaceTypeAll;
    className?: string;
    /**
     * The `text` appears as the status message. Beside plain text, you can send in a React component as well.
     */
    children?: FormStatusChildren;
}
export interface ErrorIconProps {
    /**
     * The `title` attribute in the status.
     */
    title?: string;
    state?: FormStatusState;
    [key: string]: any;
}
export interface WarnIconProps {
    /**
     * The `title` attribute in the status.
     */
    title?: string;
    state?: FormStatusState;
    [key: string]: any;
}
export interface InfoIconProps {
    /**
     * The `title` attribute in the status.
     */
    title?: string;
    state?: FormStatusState;
    [key: string]: any;
}
export interface MarketingIconProps {
    /**
     * The `title` attribute in the status.
     */
    title?: string;
    state?: FormStatusState;
    [key: string]: any;
}
export type FormStatusIconTypes = typeof ErrorIcon | typeof WarnIcon | typeof InfoIcon | typeof MarketingIcon;
interface FormStatusComponentState {
    id: string | null;
    _id?: string;
}
export default class FormStatus extends React.PureComponent<FormStatusProps, FormStatusComponentState> {
    static contextType: React.Context<import("../../shared/Context").ContextProps>;
    context: React.ContextType<typeof Context>;
    _globalStatus: ReturnType<typeof GlobalStatusProvider.init>;
    _ref: React.RefObject<HTMLElement | null>;
    _isMounted: boolean;
    contentCache: React.ReactNode | null;
    stateCache: string | null;
    static defaultProps: {
        id: any;
        title: any;
        show: boolean;
        text: any;
        globalStatus: any;
        label: any;
        icon: string;
        iconSize: string;
        size: string;
        variant: any;
        state: string;
        attributes: any;
        textId: any;
        widthSelector: any;
        widthElement: any;
        noAnimation: any;
        skeleton: any;
        stretch: any;
        role: any;
        className: any;
        children: any;
    };
    static getContent(props: FormStatusProps): any;
    static correctStatus(state: FormStatusState | undefined): FormStatusState;
    static getIcon({ state, icon, iconSize, }: Pick<FormStatusProps, 'state' | 'icon' | 'iconSize'>): string | number | bigint | boolean | import("react/jsx-runtime").JSX.Element | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode>>;
    static getDerivedStateFromProps(props: FormStatusProps, state: FormStatusComponentState): FormStatusComponentState;
    state: {
        id: any;
    };
    constructor(props: FormStatusProps, context: React.ContextType<typeof Context>);
    init: () => void;
    componentDidMount(): void;
    fillCache(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: FormStatusProps): void;
    getProps(context?: React.ContextType<typeof Context>): Readonly<FormStatusProps> & {};
    getStatusId(): string;
    updateWidth: () => void;
    shouldAnimate(): boolean;
    isReadyToGetVisible(props?: FormStatusProps): boolean;
    render(): import("react/jsx-runtime").JSX.Element;
}
export declare const ErrorIcon: (props: ErrorIconProps) => import("react/jsx-runtime").JSX.Element;
export declare const WarnIcon: (props: WarnIconProps) => import("react/jsx-runtime").JSX.Element;
export declare const InfoIcon: (props: InfoIconProps) => import("react/jsx-runtime").JSX.Element;
export declare const MarketingIcon: (props: MarketingIconProps) => import("react/jsx-runtime").JSX.Element;
export declare function setMaxWidthToElement({ element, id, widthElement, widthSelector, }: {
    element: HTMLElement;
    id?: string | null;
    widthElement?: HTMLElement | null;
    widthSelector?: string | null;
}): void;
export {};
