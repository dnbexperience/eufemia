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
  /**
   * use either the `label` property or provide a custom one.
   */
  label?: React.ReactNode;
  /**
   * use `label_direction="vertical"` to change the label/legend layout direction. Defaults to `horizontal`.
   */
  label_direction?: FormLabelLabelDirection;
  /**
   * use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean;
  label_id?: string;
  /**
   * if you need to style the "legend", then you can either send in a custom Component, like `label={ <H2> }`, or define your styling class with the `label_class` property.
   */
  label_class?: string;
  no_label?: boolean;
  /**
   * if set to `true`, then the internal `legend` element will be a `label` instead, and no `<fieldset>` is used. Keep in mind, that `<legend>` and `<fieldset>` **is only used if a `label` is provided**. Defaults to `false`.
   */
  no_fieldset?: boolean;
  /**
   * Send along a different locale to all nested components.
   */
  locale?: InternalLocale;
  /**
   * forces the content of a FormRow to wrap. Make sure you always define spacing as `right="..."` and not `left`, this way components will align left once they wrap. Defaults to `false`.
   */
  wrap?: boolean;
  /**
   * to define the layout direction on how the next component should be placed on. Can be either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  direction?: FormRowDirection;
  /**
   * will force both `direction` and `label_direction` to be **vertical** if set to `true`.
   */
  vertical?: boolean;
  /**
   * will center all children vertically as long as the screen does not hit a mobile width.
   */
  centered?: boolean;
  /**
   * to enable the visual helper `.dnb-section` class. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.
   */
  section_style?: SectionStyleTypes;
  /**
   * to modify the `spacing`. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.
   */
  section_spacing?: SectionSpacing;
  globalStatus?: GlobalStatusConfigObject;
  /**
   * to force responsiveness on form components (like [Input](/uilib/components/input) and their labels ([FormLabel](/uilib/components/form-label)), set the property to `true`. Defaults to `false`.
   */
  responsive?: boolean;
  /**
   * if set to `true`, every component inside will be disabled. Defaults to `false`.
   */
  disabled?: boolean;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  skipContentWrapperIfNested?: boolean;
  className?: string;
  children?: FormRowChildren;
}
export default class FormRow extends React.Component<FormRowProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
