import * as React from 'react';
import type { SectionSpacing, SectionStyleTypes } from '../Section';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import type { FormLabelLabelDirection } from '../FormLabel';
import type { InternalLocale } from '../../shared/Context';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
export type FormSetDirection = 'vertical' | 'horizontal';
export type FormSetChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export interface FormSetProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
  /**
   * define what HTML element should be used. Defaults to `<form>`.
   */
  element?: string;
  /**
   * if set to `true`, then a `div` HTML element will be used instead of `form`. Defaults to `false`.
   */
  no_form?: boolean;
  /**
   * if set to `true`, every component inside will be disabled. Defaults to `false`.
   */
  disabled?: boolean;
  /**
   * if set to `true`, it enables skeleton for nested components. Defaults to `false`.
   */
  skeleton?: SkeletonShow;
  /**
   * if set to `true`, components inside can't cause a page refresh. The event `on_submit` will still be triggered. Defaults to `false`.
   */
  prevent_submit?: boolean;
  id?: string;
  label?: React.ReactNode;
  label_direction?: FormLabelLabelDirection;
  label_sr_only?: boolean;
  label_id?: string;
  label_class?: string;
  no_label?: boolean;
  no_fieldset?: boolean;
  /**
   * Send along a different locale to all nested components.
   */
  locale?: InternalLocale;
  wrap?: boolean;
  direction?: FormSetDirection;
  vertical?: boolean;
  centered?: boolean;
  section_style?: SectionStyleTypes;
  section_spacing?: SectionSpacing;
  globalStatus?: GlobalStatusConfigObject;
  responsive?: boolean;
  skipContentWrapperIfNested?: boolean;
  className?: string;
  children?: FormSetChildren;
  on_submit?: (...args: any[]) => any;
}
export default class FormSet extends React.Component<
  FormSetProps,
  unknown
> {
  static defaultProps: Partial<FormSetProps>;
  render(): JSX.Element;
}
