import * as React from 'react';
export type FormSetNoForm = string | boolean;
export type FormSetDisabled = string | boolean;
export type FormSetSkeleton = string | boolean;
export type FormSetPreventSubmit = string | boolean;
export type FormSetLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type FormSetLabelDirection = 'vertical' | 'horizontal';
export type FormSetLabelSrOnly = string | boolean;
export type FormSetNoLabel = string | boolean;
export type FormSetNoFieldset = string | boolean;
export type FormSetWrap = string | boolean;
export type FormSetDirection = 'vertical' | 'horizontal';
export type FormSetVertical = string | boolean;
export type FormSetCentered = string | boolean;
export type FormSetSectionSpacing = string | boolean;
export type FormSetResponsive = string | boolean;
export type FormSetSpace =
  | string
  | number
  | boolean
  | {
      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
       */
      top?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
       */
      right?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
       */
      bottom?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
       */
      left?: string | number | boolean;
    };
export type FormSetTop = string | number | boolean;
export type FormSetRight = string | number | boolean;
export type FormSetBottom = string | number | boolean;
export type FormSetLeft = string | number | boolean;
export type FormSetChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface FormSetProps extends React.HTMLProps<HTMLElement> {
  /**
   * Define what HTML element should be used. Defaults to `<form>`.
   */
  element?: string;

  /**
   * If set to `true`, then a `div` HTML element will be used instead of `form`. Defaults to `false`.
   */
  no_form?: FormSetNoForm;

  /**
   * If set to `true`, every component inside will be disabled. Defaults to `false`.
   */
  disabled?: FormSetDisabled;

  /**
   * If set to `true`, it enables skeleton for nested components. Defaults to `false`.
   */
  skeleton?: FormSetSkeleton;

  /**
   * If set to `true`, components inside can&#39;t cause a page refresh. The event `on_submit` will still be triggered. Defaults to `false`.
   */
  prevent_submit?: FormSetPreventSubmit;
  id?: string;

  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: FormSetLabel;

  /**
   * Use `label_direction="vertical"` to change the label/legend layout direction. Defaults to `horizontal`.
   */
  label_direction?: FormSetLabelDirection;

  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: FormSetLabelSrOnly;
  label_id?: string;

  /**
   * If you need to style the "legend", then you can either send in a custom Component, like `label={ <H2> }`, or define Your styling class with the `label_class` property.
   */
  label_class?: string;
  no_label?: FormSetNoLabel;

  /**
   * If set to `true`, then the internal `legend` element will be a `label` instead, and no `<fieldset>` is used. Keep in mind, that `<legend>` and `<fieldset>` <strong>is only used if a `label` is provided</strong>. Defaults to `false`.
   */
  no_fieldset?: FormSetNoFieldset;

  /**
   * Send along a different locale to all nested components.
   */
  locale?: string;

  /**
   * Forces the content of a FormRow to wrap. Make sure you always define spacing as `right="..."` and not `left`, this way components will align left once they wrap. Defaults to `false`.
   */
  wrap?: FormSetWrap;

  /**
   * To define the layout direction on how the next component should be placed on. Can be either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  direction?: FormSetDirection;

  /**
   * Will force both `direction` and `label_direction` to be "vertical" if set to `true`.
   */
  vertical?: FormSetVertical;

  /**
   * Will center all children vertically as long as the screen does not hit a mobile width.
   */
  centered?: FormSetCentered;

  /**
   * To enable the visual helper `.dnb-section` class. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to null.
   */
  section_style?: string;

  /**
   * To modify the `spacing`. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to null.
   */
  section_spacing?: FormSetSectionSpacing;
  global_status_id?: string;

  /**
   * To force responsiveness on form components (like <a href="/uilib/components/input">Input</a> and their labels (<a href="/uilib/components/form-label">FormLabel</a>), set the prop to `true`. Defaults to `false`.
   */
  responsive?: FormSetResponsive;
  class?: string;
  skipContentWrapperIfNested?: boolean;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: FormSetSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: FormSetTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: FormSetRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: FormSetBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: FormSetLeft;
  className?: string;
  children?: FormSetChildren;

  /**
   * Will be called on submit. Returns an object with a native event: `{ event }`
   */
  on_submit?: (...args: any[]) => any;
}
export default class FormSet extends React.Component<FormSetProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
