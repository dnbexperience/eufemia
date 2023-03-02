import * as React from 'react';
import { SkeletonShow } from '../Skeleton';
export type IconIcon =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export type IconSize = number | string | 'default' | 'medium' | 'large';
export type IconSpace =
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
export type IconTop = string | number | boolean;
export type IconRight = string | number | boolean;
export type IconBottom = string | number | boolean;
export type IconLeft = string | number | boolean;
export type IconWidth = string | number;
export type IconHeight = string | number;
export type IconAttributes = string | Record<string, unknown>;
export type IconChildren = React.ReactNode | ((...args: any[]) => any);
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface IconProps extends React.HTMLProps<HTMLElement> {
  /**
   * <em>(required)</em> a React SVG Component or the icon name (in case we use `IconPrimary` or `dnb-icon-primary`).
   */
  icon?: IconIcon;

  /**
   * Modifier class to define. Will result in: `dnb-icon--${modifier}`.
   */
  modifier?: string;

  /**
   * The dimension of the icon. This will be the `viewBox` and represent `width` and `height`. Defaults to `16`. You can use `small`,`medium`, `large` or `auto`. Auto will enable that the icon size gets inherited by the parent HTML element if it provides a `font-size`.
   */
  size?: IconSize;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: IconSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: IconTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: IconRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: IconBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: IconLeft;
  width?: IconWidth;
  height?: IconHeight;

  /**
   * Use `true` to display a rounded border with an inherited color. Keep in mind that the icon will have a larger total width and height of `+0.5em`.
   */
  border?: boolean;

  /**
   * The color can be any valid color property, such as Hex, RGB or preferable – any CSS variable from the <a href="/uilib/usage/customisation/colors">colors table</a>, e.g. `var(--color-ocean-green)`. Default is no color, which means `--color-black-80`.
   */
  color?: string;

  /**
   * Default to `true`. Set to `false` if you do not want to inherit the color by `currentColor`.
   */
  inherit_color?: boolean;

  /**
   * The alternative label (text version) of the icon. Defaults to the imported icon name.
   */
  alt?: string;

  /**
   * Use a title to provide extra information about the icon used.
   */
  title?: string;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  attributes?: IconAttributes;
  className?: string;
  children?: IconChildren;
}
export default class Icon extends React.Component<IconProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
