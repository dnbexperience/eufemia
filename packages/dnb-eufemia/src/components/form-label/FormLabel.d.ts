import * as React from 'react';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
export type FormLabelSize = 'medium' | 'large';
export type FormLabelText =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type FormLabelLabelDirection = 'vertical' | 'horizontal';
export type FormLabelChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export interface FormLabelProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
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
  /**
   * Define one of the following <a href="/uilib/elements/heading/">heading size</a>: `medium` or `large`.
   */
  size?: FormLabelSize;
  id?: string;
  class?: string;
  disabled?: boolean;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  label_direction?: FormLabelLabelDirection;
  /**
   * If set to `true`, will do the same as `label_direction` when set to "vertical".
   */
  vertical?: boolean;
  sr_only?: boolean;
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
