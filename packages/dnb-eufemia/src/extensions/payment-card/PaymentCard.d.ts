import * as React from 'react';
import type { SpacingProps } from '../shared/types';
import type { SkeletonShow } from '../components/skeleton/Skeleton';
import type { Locale } from '../../shared/Context';
export type PaymentCardCardStatus = 'active' | 'blocked' | 'expired';
export type PaymentCardVariant = 'normal' | 'compact';
export type PaymentCardDigits = string | number;
export enum CardType {
  Visa, // eslint-disable-line
  Mastercard, // eslint-disable-line
  None // eslint-disable-line
}

export enum ProductType {
  Saga, // eslint-disable-line
  Pluss, // eslint-disable-line
  Intro, // eslint-disable-line
  Business, // eslint-disable-line
  Bedrift, // eslint-disable-line
  PrivateBanking, // eslint-disable-line
  None // eslint-disable-line
}

export enum BankAxept {
  White, // eslint-disable-line
  Black, // eslint-disable-line
  Gold, // eslint-disable-line
  Black20, // eslint-disable-line
  Gray // eslint-disable-line
}

export enum BankAxeptType {
  BankAxept, // eslint-disable-line
  None // eslint-disable-line
}

export enum Designs {
  defaultDesign, // eslint-disable-line
  young, // eslint-disable-line
  myFirst, // eslint-disable-line
  youth, // eslint-disable-line
  pluss, // eslint-disable-line
  gold, // eslint-disable-line
  saga, // eslint-disable-line
  sagaPlatinum, // eslint-disable-line
  privateBanking, // eslint-disable-line
  mcBlack, // eslint-disable-line
  businessNoVisa, // eslint-disable-line
  businessWithVisa // eslint-disable-line
}

export interface PaymentCardRawData {
  productCode: string;
  productName: string;
  displayName: string;
  cardDesign: Designs;
  cardType: CardType;
  productType: ProductType;
  bankAxept: BankAxeptType;
}
export type PaymentCardChildren =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export interface PaymentCardProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
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
  locale?: Locale;

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
export const formatCardNumber = (cardNumber: string, digits?: number) =>
  string;
