import * as React from 'react';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
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
  extends React.HTMLProps<HTMLElement>,
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
  id?: string;
  class?: string;
  disabled?: boolean;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  label_direction?: FormLabelLabelDirection;

  /**
   * Will force both `direction` and `label_direction` to be "vertical" if set to `true`.
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
