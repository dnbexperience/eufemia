import * as React from 'react';
import type { FormStatusBaseProps } from '../FormStatus';
import type { FormLabelLabelDirection } from '../FormLabel';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
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
    SpacingProps,
    FormStatusBaseProps {
  label?: React.ReactNode;
  labelDirection?: FormLabelLabelDirection;
  labelSrOnly?: boolean;
  labelPosition?: RadioGroupLabelPosition;
  title?: string;
  disabled?: boolean;
  skeleton?: SkeletonShow;
  id?: string;
  name?: string;
  size?: RadioGroupSize;
  suffix?: RadioGroupSuffix;
  layoutDirection?: RadioGroupLayoutDirection;
  vertical?: boolean;
  value?: string;
  attributes?: RadioGroupAttributes;
  className?: string;
  children?: RadioGroupChildren;
  onChange?: (...args: any[]) => any;
}
declare const RadioGroup: React.ComponentClass<RadioGroupProps> & {
  defaultProps: object;
};
export default RadioGroup;
