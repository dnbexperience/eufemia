import * as React from 'react';
import type { SkeletonShow } from '../Skeleton';
export type TextareaLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type TextareaLabelDirection = 'horizontal' | 'vertical';
export type TextareaStatus =
  | string
  | boolean
  | ((...args: any[]) => any)
  | React.ReactNode;
export type TextareaSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type TextareaAlign = 'left' | 'right';
export type TextareaAutoresizeMaxRows = string | number;
export type TextareaTextareaAttributes = string | Record<string, unknown>;
export type TextareaRows = number | string;
export type TextareaCols = number | string;
export type TextareaInnerRef =
  | ((...args: any[]) => any)
  | Record<string, unknown>;
export type TextareaSpace =
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
export type TextareaTop = string | number | boolean;
export type TextareaRight = string | number | boolean;
export type TextareaBottom = string | number | boolean;
export type TextareaLeft = string | number | boolean;
export type TextareaTextareaElement =
  | ((...args: any[]) => any)
  | React.ReactNode;
export type TextareaChildren = React.ReactNode | ((...args: any[]) => any);
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface TextareaProps extends React.HTMLProps<HTMLElement> {
  /**
   * The content value of the Textarea.
   */
  value?: string;
  id?: string;

  /**
   * Prepends the Form Label component. If no ID is provided, a random ID is created.
   */
  label?: TextareaLabel;

  /**
   * Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`
   */
  label_direction?: TextareaLabelDirection;

  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean;

  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: TextareaStatus;

  /**
   * To control the visual focus state as a prop, like `focus` or `blur`.
   */
  textarea_state?: string;

  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: string;

  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: Record<string, unknown>;
  status_no_animation?: boolean;

  /**
   * The `status_id` used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  global_status_id?: string;

  /**
   * Text describing the content of the Textarea more than the label. You can also send in a React component, so it gets wrapped inside the Textarea component.
   */
  suffix?: TextareaSuffix;

  /**
   * The placeholder which shows up once the Textarea value is empty
   */
  placeholder?: string;

  /**
   * Defines the `text-align` of the Textarea. Defaults to `left`.
   */
  align?: TextareaAlign;

  /**
   * If set to `true`, then the Textarea field will be 100% in `width`.
   */
  stretch?: boolean;
  disabled?: boolean;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;

  /**
   * Use `true` to make the Textarea grow and shrink depending on how many lines the user has filled.
   */
  autoresize?: boolean;

  /**
   * Set a number to define how many rows the Textarea can auto grow.
   */
  autoresize_max_rows?: TextareaAutoresizeMaxRows;
  class?: string;

  /**
   * In case we have to set a custom Textarea class.
   */
  textarea_class?: string;

  /**
   * Provide the Textarea element with any attributes by using an Object `textarea_attributes={{size:&#39;2&#39;}}` or a JSON Object `textarea_attributes=&#39;{"size":"2"}&#39;`. "NB:" Keep in mind, that also every not listed component property will be sent along and set as a Textarea element attribute.
   */
  textarea_attributes?: TextareaTextareaAttributes;
  readOnly?: boolean;
  rows?: TextareaRows;
  cols?: TextareaCols;

  /**
   * By providing a React.ref we can get the internally used Textarea element (DOM). E.g. `inner_ref={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  inner_ref?: TextareaInnerRef;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: TextareaSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: TextareaTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: TextareaRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: TextareaBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: TextareaLeft;
  className?: string;
  textarea_element?: TextareaTextareaElement;
  children?: TextareaChildren;

  /**
   * Will be called on value changes made by the user. Returns an object with a string value and the native event: `{ value, rows, event }`.
   */
  on_change?: (...args: any[]) => any;

  /**
   * Will be called on the focus set by the user. Returns `{ value, event }`.
   */
  on_focus?: (...args: any[]) => any;

  /**
   * Will be called on blur set by the user. Returns `{ value, event }`.
   */
  on_blur?: (...args: any[]) => any;

  /**
   * Will be called during every keystroke. Returns `{ value, rows, event }`.
   */
  on_key_down?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
}
export default class Textarea extends React.Component<TextareaProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
