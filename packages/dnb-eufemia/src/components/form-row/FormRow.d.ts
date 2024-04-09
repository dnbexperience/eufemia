import * as React from 'react';
import type { SectionSpacing, SectionStyleTypes } from '../Section';
import type { FormLabelLabelDirection } from '../FormLabel';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import type { InternalLocale } from '../../shared/Context';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
export type FormRowDirection = 'vertical' | 'horizontal';
export type FormRowChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export interface FormRowProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
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
  direction?: FormRowDirection;
  vertical?: boolean;
  centered?: boolean;
  section_style?: SectionStyleTypes;
  section_spacing?: SectionSpacing;
  globalStatus?: GlobalStatusConfigObject;
  responsive?: boolean;
  disabled?: boolean;
  skeleton?: SkeletonShow;
  class?: string;
  skipContentWrapperIfNested?: boolean;
  className?: string;
  children?: FormRowChildren;
}
export default class FormRow extends React.Component<FormRowProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
