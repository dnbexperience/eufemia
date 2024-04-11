import * as React from 'react';
export type TextMaskMask =
  | any[]
  | ((...args: any[]) => any)
  | boolean
  | {
      mask?: any[] | ((...args: any[]) => any);
      pipe?: (...args: any[]) => any;
    };
export type TextMaskInputElement =
  | React.ReactNode
  | ((...args: any[]) => any);
export type TextMaskValue = string | number;
export interface TextMaskProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'ref'> {
  mask: TextMaskMask;
  inputRef?: React.MutableRefObject<HTMLInputElement>;
  inputElement?: TextMaskInputElement;
  onChange?: (...args: any[]) => any;
  guide?: boolean;
  value?: TextMaskValue;
  pipe?: (...args: any[]) => any;
  placeholderChar?: string;
  keepCharPositions?: boolean;
  showMask?: boolean;
}
export default class TextMask extends React.Component<TextMaskProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
