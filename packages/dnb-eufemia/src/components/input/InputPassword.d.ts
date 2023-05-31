import * as React from 'react';
import type { InputProps } from './Input';

export interface InputPasswordProps
  extends React.HTMLProps<HTMLElement>,
    InputProps {
  show_password?: string;
  hide_password?: string;
  on_show_password?: (...args: any[]) => any;
  on_hide_password?: (...args: any[]) => any;
}
export default class InputPassword extends React.Component<
  InputPasswordProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
