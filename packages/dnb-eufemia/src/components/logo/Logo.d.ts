import * as React from 'react';
import type { IconColor } from '../Icon';
import type { SpacingProps } from '../space/types';
export type LogoSize = number | string;
export type LogoRatio = number | string;
export type LogoWidth = number | string;
export type LogoHeight = number | string;
export interface LogoProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
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
  color?: IconColor;

  /**
   * Define which brand&#39;s logo to show. `ui` (DNB) or `sbanken`. Defaults to `ui`
   */
  brand?: string;

  /**
   * Define the logo variant, if there is more than one variant of a brand&#39;s logo. Currently the only option other than default is a `compact` variant of the Sbanken logo. Defaults to `default`
   */
  variant?: string;

  /**
   * Set to `true` if you do not want to inherit the color by `currentColor`. Default to `false`.
   */
  inherit_color?: boolean;
  class?: string;
  className?: string;
}
export default class Logo extends React.Component<LogoProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
