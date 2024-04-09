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
  element?: string;
  no_form?: boolean;
  disabled?: boolean;
  skeleton?: SkeletonShow;
  prevent_submit?: boolean;
  id?: string;
  label?: React.ReactNode;
  label_direction?: FormLabelLabelDirection;
  label_sr_only?: boolean;
  label_id?: string;
  label_class?: string;
  no_label?: boolean;
  no_fieldset?: boolean;
  locale?: InternalLocale;
  wrap?: boolean;
  direction?: FormSetDirection;
  vertical?: boolean;
  centered?: boolean;
  section_style?: SectionStyleTypes;
  section_spacing?: SectionSpacing;
  globalStatus?: GlobalStatusConfigObject;
  responsive?: boolean;
  class?: string;
  skipContentWrapperIfNested?: boolean;
  className?: string;
  children?: FormSetChildren;
  on_submit?: (...args: any[]) => any;
}
export default class FormSet extends React.Component<FormSetProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
