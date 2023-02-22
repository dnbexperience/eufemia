import * as React from 'react';
export type LogoSize = number | string;
export type LogoRatio = number | string;
export type LogoWidth = number | string;
export type LogoHeight = number | string;
export type LogoSpace =
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
export type LogoTop = string | number | boolean;
export type LogoRight = string | number | boolean;
export type LogoBottom = string | number | boolean;
export type LogoLeft = string | number | boolean;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface LogoProps extends React.HTMLProps<HTMLElement> {
  /**
   * Define the size of the logo. Sets the height. The width will be calculated by the ratio. Also, `inherit` will use the inherited height. Defaults to `auto`
   */
  size?: LogoSize;
  ratio?: LogoRatio;

  /**
   * Define either the width of the logo
   */
  width?: LogoWidth;

  /**
   * Or define the height of the logo
   */
  height?: LogoHeight;
  alt?: string;

  /**
   * Define the color of the logo
   */
  color?: string;

  /**
   * Set to `true` if you do not want to inherit the color by `currentColor`. Default to `false`.
   */
  inherit_color?: boolean;
  class?: string;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: LogoSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: LogoTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: LogoRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: LogoBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: LogoLeft;
  className?: string;
}
export default class Logo extends React.Component<LogoProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
