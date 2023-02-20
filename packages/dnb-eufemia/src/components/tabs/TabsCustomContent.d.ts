import * as React from 'react';
export type CustomContentTitle =
  | Object
  | React.ReactNode
  | ((...args: any[]) => any);
export type CustomContentSelected = string | boolean;
export type CustomContentDisabled = string | boolean;
export type CustomContentSpace =
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
export type CustomContentTop = string | number | boolean;
export type CustomContentRight = string | number | boolean;
export type CustomContentBottom = string | number | boolean;
export type CustomContentLeft = string | number | boolean;
export type CustomContentChildren =
  | React.ReactNode
  | ((...args: any[]) => any);
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface CustomContentProps extends React.HTMLProps<HTMLElement> {
  displayName?: string;
  title?: CustomContentTitle;
  hash?: string;
  selected?: CustomContentSelected;
  disabled?: CustomContentDisabled;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: CustomContentSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: CustomContentTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: CustomContentRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: CustomContentBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: CustomContentLeft;

  /**
   * <em>(required)</em> the content to render. Can be a function, returning the current tab content `(key) => (&#39;Current tab&#39;)`, a React Component or an object with the keys and content `{key1: &#39;Current tab&#39;}`.
   */
  children?: CustomContentChildren;
  className?: string;
  class?: string;
}
export default class CustomContent extends React.Component<
  CustomContentProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
