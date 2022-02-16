import * as React from 'react';
export type SectionSpacing = string | boolean;
export type SectionSpace =
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
export type SectionTop = string | number | boolean;
export type SectionRight = string | number | boolean;
export type SectionBottom = string | number | boolean;
export type SectionLeft = string | number | boolean;
export type SectionChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;

export interface SectionProps extends React.HTMLProps<HTMLElement> {
  /**
   * To define the style of the visual helper. Use and `Style ID` from below. Defaults to `mint-green-12`.
   */
  style_type?: string;

  /**
   * Will add the default spacing around the wrapped content. Use `spacing-large`, `spacing-medium` or `spacing-small`. Defaults to `false`. If `true`, then `spacing-default` is used. Se the <a href="/uilib/usage/layout/spacing#spacing-helpers">available sizes</a>.
   */
  spacing?: SectionSpacing;

  /**
   * Define what HTML element should be used. Defaults to `<section>`.
   */
  element?: string;
  inner_ref?: React.RefObject<any>;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: SectionSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: SectionTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: SectionRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: SectionBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: SectionLeft;
  class?: string;
  className?: string;
  children?: SectionChildren;
}
export default class Section extends React.Component<SectionProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
