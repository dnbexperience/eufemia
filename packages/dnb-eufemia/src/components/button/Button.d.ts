import * as React from 'react';
import type { SkeletonShow } from '../skeleton/Skeleton';
import { IconPrimaryIcon } from '../icon-primary/IconPrimary';
import { DataAttributeTypes } from '../../shared/types';
export type ButtonText = string | React.ReactNode;
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'signal'
  | 'unstyled';
export type ButtonSize = 'default' | 'small' | 'medium' | 'large';
export type ButtonIcon = IconPrimaryIcon;
export type ButtonIconPosition = 'left' | 'right' | 'top';
export type ButtonIconSize = string | number;
export type ButtonTooltip =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type ButtonStatus =
  | string
  | boolean
  | ((...args: any[]) => any)
  | React.ReactNode;
export type ButtonTo = string | any | ((...args: any[]) => any);
export type ButtonSkeleton = SkeletonShow;
export type ButtonChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type ButtonElement =
  | ((...args: any[]) => any)
  | any
  | React.ReactNode;
export type ButtonSpace =
  | string
  | number
  | boolean
  | {
      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
       */
      top?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
       */
      right?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
       */
      bottom?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
       */
      left?: string | number | boolean;
    };
export type ButtonTop = string | number | boolean;
export type ButtonRight = string | number | boolean;
export type ButtonBottom = string | number | boolean;
export type ButtonLeft = string | number | boolean;
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
   * Title of the button. Optional, but should always be included because of accessibility.
   */
  title?: React.ReactNode;

  /**
   * Defines the kind of button. Possible values are `primary`, `secondary`, `tertiary` and `signal`. Defaults to `primary`.
   */
  variant?: ButtonVariant;

  /**
   * The size of the button. For now there is "medium", "default" and "large".
   */
  size?: ButtonSize;

  /**
   * To be included in the button. <a href="/icons/primary">Primary Icons</a> can be set as a string (e.g. `icon="chevron_right"`), other icons should be set as React elements.
   */
  icon?: ButtonIcon;

  /**
   * Position of icon inside the button. Set to `left` or `right`. Tertiary button variant also supports `top`. Defaults to `right` if not set.
   */
  icon_position?: ButtonIconPosition;

  /**
   * Define icon width and height. Defaults to 16px
   */
  icon_size?: ButtonIconSize;

  /**
   * Provide a string or a React Element to be shown as the tooltip content.
   */
  tooltip?: ButtonTooltip;

  /**
   * Set it to either `status="error"` or a text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: ButtonStatus;

  /**
   * Defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: string;

  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: any;
  status_no_animation?: boolean;

  /**
   * The `status_id` used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  global_status_id?: string;
  id?: string;

  /**
   * Any extra modifying class.
   */
  class?: string;

  /**
   * If you want the button to behave as a link. Use with caution! A link should normally visually be a link and not a button.
   */
  href?: string;

  /**
   * When button behaves as a link. Used to specify where to open the linked document, specified by `href`. Possible values are `_self`, `_blank`, `_parent` and `_top`.
   */
  target?: string;

  /**
   * Used to specify the relationship between a linked resource and the current document. Examples(non-exhaustive list) of values are `nofollow`, `search`, and `tag`.
   */
  rel?: string;

  /**
   * Use this prop only if you are using a router Link component as the `element` that uses the `to` property to declare the navigation url.
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
  inner_ref?: any;
  className?: string;
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
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: ButtonSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: ButtonTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: ButtonRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: ButtonBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: ButtonLeft;

  /**
   * Will be called on a click event. Returns an object with the native event: `{ event }`.
   */
  on_click?: ButtonOnClick;
} & Partial<
  DataAttributeTypes &
    Partial<React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>>
>;
export default class Button extends React.Component<ButtonProps, any> {
  render(): JSX.Element;
}
