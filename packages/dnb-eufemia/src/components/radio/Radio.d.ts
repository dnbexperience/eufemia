import * as React from 'react';
import type { FormStatusBaseProps } from '../FormStatus';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import RadioGroup from './RadioGroup';
export type RadioLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type RadioLabelPosition = 'left' | 'right';
export type RadioSize = 'default' | 'medium' | 'large';
export type RadioSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type RadioChildren = string | ((...args: any[]) => any);
export interface RadioProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps,
    FormStatusBaseProps {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: RadioLabel;
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean;
  /**
   * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
   */
  labelPosition?: RadioLabelPosition;
  /**
   * Determine whether the radio is checked or not. Default will be `false`.
   */
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  element?: React.ElementType;
  /**
   * Use a unique group identifier to define the Radio buttons that belongs together.
   */
  group?: string;
  /**
   * The size of the Radio button. For now there is **medium** (default) and **large**.
   */
  size?: RadioSize;
  suffix?: RadioSuffix;
  /**
   * Defines the `value` as a string. Use it to get the value during the `onChange` event listener callback in the **RadioGroup**.
   */
  value?: string;
  skeleton?: SkeletonShow;
  readOnly?: boolean;
  className?: string;
  children?: RadioChildren;
  onChange?: (...args: any[]) => any;

  /**
   * By providing a React.ref we can get the internally used input element (DOM). E.g. `ref={myRef}` by using `React.useRef()`.
   */
  ref?: React.Ref;
}
declare const Radio: ((props: RadioProps) => React.JSX.Element) & {
  defaultProps: object;
  Group: typeof RadioGroup;
};
export default Radio;
