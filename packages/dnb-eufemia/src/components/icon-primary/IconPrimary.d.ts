import * as React from 'react';
import type { IconProps } from '../Icon';
export interface IconPrimaryProps
  extends IconProps,
    Omit<React.HTMLProps<HTMLElement>, 'size' | 'ref'> {}
export default class IconPrimary extends React.Component<
  IconPrimaryProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
