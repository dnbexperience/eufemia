import * as React from 'react';
import type { SpacingProps } from '../shared/types';
import type { SkeletonShow } from '../components/skeleton/Skeleton';
export type PaymentCardCardStatus = 'active' | 'blocked' | 'expired';
export type PaymentCardVariant = 'normal' | 'compact';
export type PaymentCardDigits = string | number;

export interface PaymentCardRawData {
  productCode: string;
  productName: string;
  displayName: string;
  cardDesign: Record<string, unknown>;
  cardType: Record<string, unknown>;
  productType: Record<string, unknown>;
}

export type PaymentCardChildren =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);

export interface PaymentCardProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
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
  skeleton?: SkeletonShow;

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

export const getCardData = (product_code: string) => PaymentCardRawData;
