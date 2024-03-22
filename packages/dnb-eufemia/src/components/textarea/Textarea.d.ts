import * as React from 'react';
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText
} from '../FormStatus';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import type { FormLabelLabelDirection, FormLabelText } from '../FormLabel';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
import type { TextCounterProps } from '../../fragments/TextCounter';
export type TextareaSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type TextareaAlign = 'left' | 'right';
export type TextareaAutoresizeMaxRows = string | number;
export type TextareaTextareaAttributes = string | Record<string, unknown>;
export type TextareaRows = number | string;
export type TextareaCols = number | string;
export type TextareaTextareaElement =
  | ((...args: any[]) => any)
  | React.ReactNode;
export type TextareaChildren = React.ReactNode | ((...args: any[]) => any);
export type TextareaSize = 'small' | 'medium' | 'large';
export interface TextareaProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
  /**
   * The content value of the Textarea.
   */
  value?: string;
  id?: string;
  /**
   * Prepends the Form Label component. If no ID is provided, a random ID is created.
   */
  label?: FormLabelText;
  /**
   * Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.
   */
  label_direction?: FormLabelLabelDirection;
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean;
  /**
   * The sizes you can choose for 1 row is `small` (2rem), `medium` (2.5rem) and `large` (3rem). Defaults to `small`.
   */
  size?: TextareaSize;
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText;
  /**
   * To control the visual focus state as a prop, like `focus` or `blur`.
   */
  textarea_state?: string;
  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: FormStatusState;
  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: FormStatusProps;
  status_no_animation?: boolean;
  /**
   * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
   */
  globalStatus?: GlobalStatusConfigObject;
  /**
   * Text describing the content of the Textarea more than the label. You can also send in a React component, so it gets wrapped inside the Textarea component.
   */
  suffix?: TextareaSuffix;
  /**
   * The placeholder which shows up once the Textarea value is empty.
   */
  placeholder?: string;
  /**
   * Use `true` to keep the placeholder visible even when the Textarea has focus. Defaults to `false`.
   */
  keepPlaceholder?: boolean;
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
   * Use a number to define the displayed max length. You can also use an object defining the [TextCounter](uilib/components/fragments/text-counter/) `variant` or properties. Please avoid using `maxLength` for accessibility reasons.
   */
  characterCounter?: Omit<TextCounterProps, 'text'> | number;
  /**
   * Set a number to define how many rows the Textarea can auto grow.
   */
  autoresize_max_rows?: TextareaAutoresizeMaxRows;
  class?: string;
  textarea_class?: string;
  textarea_attributes?: TextareaTextareaAttributes;
  readOnly?: boolean;
  rows?: TextareaRows;
  cols?: TextareaCols;
  /**
   * By providing a React.Ref we can get the internally used Textarea element (DOM). E.g. `inner_ref={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  inner_ref?: React.Ref;
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
