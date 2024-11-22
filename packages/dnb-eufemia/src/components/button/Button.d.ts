import * as React from 'react';
import type { SkeletonShow } from '../skeleton/Skeleton';
import type { IconIcon, IconSize } from '../icon/Icon';
import type {
  DataAttributeTypes,
  DynamicElement,
  SpacingProps
} from '../../shared/types';
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText
} from '../FormStatus';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
import { AnchorProps } from '../Anchor';
export type ButtonText = string | React.ReactNode;
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'signal'
  | 'unstyled';
export type ButtonSize = 'default' | 'small' | 'medium' | 'large';
export type ButtonIcon = IconIcon;
export type ButtonIconPositionTertiary = 'top';
export type ButtonIconPosition = 'left' | 'right';
export type ButtonIconPositionAll =
  | 'left'
  | 'right'
  | ButtonIconPositionTertiary;
export type ButtonTooltip =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type ButtonTo = string | any | ((...args: any[]) => any);
export type ButtonSkeleton = SkeletonShow;
export type ButtonChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;

// Local type for react-router-dom link with only the necessary props. Done this way to prevent react-router-dom dependency.
type ReactRouterLink = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> & {
  to:
    | string
    | {
        pathname?: string;
        search?: string;
        has?: string;
      };
};
export type ButtonElement =
  | DynamicElement<HTMLButtonElement | HTMLAnchorElement | AnchorProps>
  | React.ForwardRefExoticComponent<
      ReactRouterLink & React.RefAttributes<HTMLAnchorElement>
    >
  | React.ReactNode;
export type ButtonOnClick = string | ((...args: any[]) => any);
export type ButtonProps = {
  /**
   * The content of the button can be a string or a React Element.
   */
  text?: ButtonText;
  /**
   * `button`, `reset` or `submit` for the `type` HTML attribute. Defaults to `button` for legacy reasons.
   */
  type?: string;
  /**
   * Required if there is no text in the button. If `text` and `children` are undefined, setting the `title` property will automatically set `aria-label` with the same value.
   */
  title?: React.ReactNode;
  /**
   * Defines the kind of button. Possible values are `primary`, `secondary`, `tertiary` and `signal`. Defaults to `primary` (or `secondary` if icon only).
   */
  variant?: ButtonVariant;
  /**
   * The size of the button. For now there is `small`, `medium`, `default` and `large`.
   */
  size?: ButtonSize;
  /**
   * To be included in the button. <a href="/icons/primary">Primary Icons</a> can be set as a string (e.g. `icon="chevron_right"`), other icons should be set as React elements.
   */
  icon?: ButtonIcon;
  /**
   * Position of icon inside the button. Set to `left` or `right`. Tertiary button variant also supports `top`. Defaults to `right` if not set.
   */
  icon_position?: ButtonIconPositionAll;
  /**
   * Define icon width and height. Defaults to 16px.
   */
  icon_size?: IconSize;
  /**
   * Provide a string or a React Element to be shown as the tooltip content.
   */
  tooltip?: ButtonTooltip;
  /**
   * Set it to either `status="error"` or a text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText;
  /**
   * Defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: FormStatusState;
  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: FormStatusProps;
  status_no_animation?: boolean;
  /**
   * The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  globalStatus?: GlobalStatusConfigObject;
  id?: string;
  /**
   * If you want the button to behave as a link. Use with caution! A link should normally visually be a link and not a button.
   */
  href?: string;
  /**
   * When button behaves as a link. Used to specify where to open the linked document, specified by `href`. Possible values are `_self`, `_blank`, `_parent` and `_top`.
   */
  target?: string;
  /**
   * When button behaves as a link. Used to specify the relationship between a linked resource and the current document. Examples(non-exhaustive list) of values are `nofollow`, `search`, and `tag`.
   */
  rel?: string;
  /**
   * Use this property only if you are using a router Link component as the `element` that uses the `to` property to declare the navigation url.
   */
  to?: ButtonTo;
  /**
   * If you need to inject completely custom markup (React Element) into the button component. You have then to handle alignment and styling by yourself.
   */
  custom_content?: React.ReactNode;
  /**
   * If set to `true` the button text will wrap in to new lines if the overflow point is reached. Defaults to `false`.
   */
  wrap?: boolean;
  /**
   * Set it to `true` in order to extend the bounding box (above the visual button background). You may also look into the HTML class `dnb-button__bounding` if it needs some CSS customization in order to get the particular button right for your use-case.
   */
  bounding?: boolean;
  /**
   * Set it to `true` in order to stretch the button to the available space. Defaults to false.
   */
  stretch?: boolean;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: ButtonSkeleton;
  disabled?: boolean;
  inner_ref?: React.Ref;
  className?: string;
  class?: string;
  innerRef?: any;
  /**
   * The content of the button can be a string or a React Element.
   */
  children?: ButtonChildren;
  /**
   * Only meant to be used for special use cases. Defaults to `button` or `a` depending if href is set or not.
   */
  element?: ButtonElement;
  /**
   * Will be called on a click event. Returns an object with the native event: `{ event }`.
   */
  on_click?: ButtonOnClick;
} & Partial<
  DataAttributeTypes &
    Partial<React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>>
> &
  SpacingProps;
export default class Button extends React.Component<ButtonProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
