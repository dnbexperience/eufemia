import * as React from 'react';
import type { InputProps } from '../../../../components/Input';
export interface PasswordProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    InputProps {
  show_password?: string;
  hide_password?: string;
  on_show_password?: (...args: any[]) => any;
  on_hide_password?: (...args: any[]) => any;
}
export default class Password extends React.Component<PasswordProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
