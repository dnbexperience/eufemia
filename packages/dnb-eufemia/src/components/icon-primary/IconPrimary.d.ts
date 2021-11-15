import * as React from 'react';
export type IconPrimaryIcon =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export type IconPrimarySize =
  | number
  | string
  | 'default'
  | 'medium'
  | 'large';
export type IconPrimarySpace =
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
export type IconPrimaryTop = string | number | boolean;
export type IconPrimaryRight = string | number | boolean;
export type IconPrimaryBottom = string | number | boolean;
export type IconPrimaryLeft = string | number | boolean;
export type IconPrimaryWidth = string | number;
export type IconPrimaryHeight = string | number;
export type IconPrimaryBorder = string | boolean;
export type IconPrimaryInheritColor = string | boolean;
export type IconPrimarySkeleton = string | boolean;
export type IconPrimaryAttributes =
  | string
  | React.AllHTMLAttributes<string>;
export type IconPrimaryChildren =
  | React.ReactNode
  | ((...args: any[]) => any);

/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */
export interface IconPrimaryProps extends React.HTMLProps<HTMLElement> {
  /**
   * A React SVG Component or the icon name (in case we use `IconPrimary` or `dnb-icon-primary`).
   */
  icon?: IconPrimaryIcon;

  /**
   * Modifier class to define. Will result in: `dnb-icon--${modifier}`.
   */
  modifier?: string;

  /**
   * The dimension of the icon. This will be the `viewBox` and represent `width` and `height`. Defaults to `16`. You can use `small`,`medium`, `large` or `auto`. Auto will enable that the icon size gets inherited by the mother HTML element, if it provides a `font-size`.
   */
  size?: IconPrimarySize;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: IconPrimarySpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: IconPrimaryTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: IconPrimaryRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: IconPrimaryBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: IconPrimaryLeft;
  width?: IconPrimaryWidth;
  height?: IconPrimaryHeight;

  /**
   * Use `true` to display a rounded border with an inherited color. Keep in mind that the icon will have a larger total width and height of `+0.5em`.
   */
  border?: IconPrimaryBorder;

  /**
   * Sets a color property to the `svg` markup. Default is no color, which means <em>black</em>
   */
  color?: string;

  /**
   * Default to `true`. Set to `false` if you do not want to inherit the color by `currentColor`.
   */
  inherit_color?: IconPrimaryInheritColor;

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
  skeleton?: IconPrimarySkeleton;
  attributes?: IconPrimaryAttributes;
  className?: string;
  children?: IconPrimaryChildren;
}
export default class IconPrimary extends React.Component<
  IconPrimaryProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
