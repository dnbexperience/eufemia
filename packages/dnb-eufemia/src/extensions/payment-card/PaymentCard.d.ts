import * as React from 'react';
export type PaymentCardCardStatus = 'active' | 'blocked' | 'expired';
export type PaymentCardVariant = 'normal' | 'compact';
export type PaymentCardDigits = string | number;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface PaymentCardRawData {
  productCode: string;
  productName: string;
  displayName: string;
  cardDesign: Record<string, string>;
  cardType: Record<string, string>;
  productType: Record<string, string>;
}
export type PaymentCardSkeleton = string | boolean;
export type PaymentCardSpace =
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
export type PaymentCardTop = string | number | boolean;
export type PaymentCardRight = string | number | boolean;
export type PaymentCardBottom = string | number | boolean;
export type PaymentCardLeft = string | number | boolean;
export type PaymentCardChildren =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface PaymentCardProps extends React.HTMLProps<HTMLElement> {
  /**
   * <em>(required)</em> if product code matches one of the codes in the list the card will get that design, if no match is found Default design will be used.
   */
  product_code: string;

  /**
   * Masked card number.
   */
  card_number: string;

  /**
   * Use one of these: `active`, `blocked`, `expired`. Defaults to `active`.
   */
  card_status?: PaymentCardCardStatus;

  /**
   * Defines the appearance. Use one of these: `normal` or `compact`. Defaults to `normal`.
   */
  variant?: PaymentCardVariant;

  /**
   * Will use 8 digits if none are specified.
   */
  digits?: PaymentCardDigits;

  /**
   * Useful if you want to create custom cards. See Card data properties.
   */
  raw_data?: PaymentCardRawData;
  id?: string;

  /**
   * Use `nb-NO` or `en-GB`. Defaults to the Eufemia provider.
   */
  locale?: string;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: PaymentCardSkeleton;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: PaymentCardSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: PaymentCardTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: PaymentCardRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: PaymentCardBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: PaymentCardLeft;
  class?: string;
  className?: string;
  children?: PaymentCardChildren;
}
export default class PaymentCard extends React.Component<
  PaymentCardProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
