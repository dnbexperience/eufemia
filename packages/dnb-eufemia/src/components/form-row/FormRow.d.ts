import * as React from 'react';
import type { SectionSpacing, SectionStyleTypes } from '../Section';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
export type FormRowLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type FormRowLabelDirection = 'vertical' | 'horizontal';
export type FormRowDirection = 'vertical' | 'horizontal';
export type FormRowChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;

export interface FormRowProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  id?: string;

  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: FormRowLabel;

  /**
   * Use `label_direction="vertical"` to change the label/legend layout direction. Defaults to `horizontal`.
   */
  label_direction?: FormRowLabelDirection;

  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean;
  label_id?: string;

  /**
   * If you need to style the "legend", then you can either send in a custom Component, like `label={ <H2> }`, or define Your styling class with the `label_class` property.
   */
  label_class?: string;
  no_label?: boolean;

  /**
   * If set to `true`, then the internal `legend` element will be a `label` instead, and no `<fieldset>` is used. Keep in mind, that `<legend>` and `<fieldset>` <strong>is only used if a `label` is provided</strong>. Defaults to `false`.
   */
  no_fieldset?: boolean;

  /**
   * Send along a different locale to all nested components.
   */
  locale?: string;

  /**
   * Forces the content of a FormRow to wrap. Make sure you always define spacing as `right="..."` and not `left`, this way components will align left once they wrap. Defaults to `false`.
   */
  wrap?: boolean;

  /**
   * To define the layout direction on how the next component should be placed on. Can be either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  direction?: FormRowDirection;

  /**
   * Will force both `direction` and `label_direction` to be "vertical" if set to `true`.
   */
  vertical?: boolean;

  /**
   * Will center all children vertically as long as the screen does not hit a mobile width.
   */
  centered?: boolean;

  /**
   * To enable the visual helper `.dnb-section` class. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to null.
   */
  section_style?: SectionStyleTypes;

  /**
   * To modify the `spacing`. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to null.
   */
  section_spacing?: SectionSpacing;
  global_status_id?: string;

  /**
   * To force responsiveness on form components (like <a href="/uilib/components/input">Input</a> and their labels (<a href="/uilib/components/form-label">FormLabel</a>), set the prop to `true`. Defaults to `false`.
   */
  responsive?: boolean;

  /**
   * If set to `true`, every component inside will be disabled. Defaults to `false`.
   */
  disabled?: boolean;

  /**
   * If set to `true`, it enables skeleton for nested components. Defaults to `false`.
   */
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
