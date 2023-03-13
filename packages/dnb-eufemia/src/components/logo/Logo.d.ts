import * as React from 'react';
import type { IconColor } from '../Icon';
import type { SpacingProps } from '../space/types';
type LogoSize = number | string;
type LogoRatio = number | string;
type LogoWidth = number | string;
type LogoHeight = number | string;

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
