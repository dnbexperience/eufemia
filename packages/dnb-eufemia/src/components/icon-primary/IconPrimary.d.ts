import * as React from 'react';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
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
export type IconPrimaryWidth = string | number;
export type IconPrimaryHeight = string | number;
export type IconPrimaryAttributes =
  | string
  | React.AllHTMLAttributes<string>;
export type IconPrimaryChildren =
  | React.ReactNode
  | ((...args: any[]) => any);

export interface IconPrimaryProps
  extends Omit<React.HTMLProps<HTMLElement>, 'size'>,
    SpacingProps {
  /**
   * <em>(required)</em> a React SVG Component or the icon name (in case we use `IconPrimary` or `dnb-icon-primary`).
   */
  icon?: IconPrimaryIcon;

  /**
   * Modifier class to define. Will result in: `dnb-icon--${modifier}`.
   */
  modifier?: string;

  /**
   * The dimension of the icon. This will be the `viewBox` and represent `width` and `height`. Defaults to `16`. You can use `small`,`medium`, `large` or `auto`. Auto will enable that the icon size gets inherited by the parent HTML element if it provides a `font-size`.
   */
  size?: IconPrimarySize;

  width?: IconPrimaryWidth;
  height?: IconPrimaryHeight;

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
