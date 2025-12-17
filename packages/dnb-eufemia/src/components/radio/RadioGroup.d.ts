import * as React from 'react';
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText
} from '../FormStatus';
import type { FormLabelLabelDirection } from '../FormLabel';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
export type RadioGroupLabelPosition = 'left' | 'right';
export type RadioGroupSize =
  | 'default'
  | 'small'
  | 'medium'
  | 'large'
  | number;
export type RadioGroupSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type RadioGroupLayoutDirection = 'column' | 'row';
export type RadioGroupAttributes = string | Record<string, unknown>;
export type RadioGroupChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export interface RadioGroupProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
  label?: React.ReactNode;
  label_direction?: FormLabelLabelDirection;
  label_sr_only?: boolean;
  label_position?: RadioGroupLabelPosition;
  title?: string;
  disabled?: boolean;
  skeleton?: SkeletonShow;
  id?: string;
  name?: string;
  size?: RadioGroupSize;
  status?: FormStatusText;
  status_state?: FormStatusState;
  status_props?: FormStatusProps;
  status_no_animation?: boolean;
  globalStatus?: GlobalStatusConfigObject;
  suffix?: RadioGroupSuffix;
  layout_direction?: RadioGroupLayoutDirection;
  vertical?: boolean;
  value?: string;
  attributes?: RadioGroupAttributes;
  className?: string;
  children?: RadioGroupChildren;
  on_change?: (...args: any[]) => any;
}
export default class RadioGroup extends React.Component<
  RadioGroupProps,
  unknown
> {
  static defaultProps: Partial<RadioGroupProps>;
  render(): JSX.Element;
}
