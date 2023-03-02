import * as React from 'react';
export type FormLabelText =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type FormLabelLabelDirection = 'vertical' | 'horizontal';
export type FormLabelSpace =
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
export type FormLabelTop = string | number | boolean;
export type FormLabelRight = string | number | boolean;
export type FormLabelBottom = string | number | boolean;
export type FormLabelLeft = string | number | boolean;
export type FormLabelChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface FormLabelProps extends React.HTMLProps<HTMLElement> {
  /**
   * <em>(required)</em> the `id` of the input.
   */
  for_id?: string;

  /**
   * Defines the HTML element used. Defaults to `label`.
   */
  element?: string;

  /**
   * The `title` attribute of the label.
   */
  title?: string;

  /**
   * The `text` of the label.
   */
  text?: FormLabelText;
  id?: string;
  class?: string;
  disabled?: boolean;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: boolean;
  label_direction?: FormLabelLabelDirection;

  /**
   * Will force both `direction` and `label_direction` to be "vertical" if set to `true`.
   */
  vertical?: boolean;
  sr_only?: boolean;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: FormLabelSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: FormLabelTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: FormLabelRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: FormLabelBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: FormLabelLeft;
  className?: string;
  children?: FormLabelChildren;
}
export default class FormLabel extends React.Component<
  FormLabelProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
