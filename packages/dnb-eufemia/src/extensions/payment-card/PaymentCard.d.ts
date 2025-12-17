/* eslint-disable no-unused-vars */
import * as React from 'react';
import type { SpacingProps } from '../shared/types';
import type { SkeletonShow } from '../components/skeleton/Skeleton';
import type { InternalLocale } from '../../shared/Context';
export type PaymentCardCardStatus =
  | 'active'
  | 'blocked'
  | 'expired'
  | 'not_active'
  | 'new_order'
  | 'new'
  | 'order_in_process'
  | 'renewed'
  | 'replaced'
  | 'unknown';
export type PaymentCardVariant = 'normal' | 'compact';
export type PaymentCardDigits = string | number;
export enum CardType {
  Visa,
  Mastercard,
  None
}
export enum ProductType {
  Saga,
  Pluss,
  Intro,
  Business,
  Bedrift,
  PrivateBanking,
  Corporate,
  WorldElite,
  None
}
export enum BankAxept {
  White,
  Black,
  Gold,
  Black20,
  Gray,
  GrayDark
}
export enum BankAxeptType {
  BankAxept,
  Credit,
  None
}
export enum Designs {
  defaultDesign,
  pluss,
  young,
  myFirst,
  youth,
  gold,
  saga,
  sagaPlatinum,
  privateBanking,
  mcBlack,
  businessNoVisa,
  businessWithVisa,
  sbankenVisa,
  sbankenMastercard
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
export interface CardDesign {
  name: string;
  cardStyle: string;
  bankLogo: any;
  visa: any;
  mastercard: any;
  bankAxept: any;
  saga: any;
  privateBanking: any;
}
export type PaymentCardChildren =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export interface PaymentCardProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
  /**
   * if product code matches one of the codes in the list the card will get that design, if no match is found Default design will be used.
   */
  product_code: string;
  /**
   * masked card number.
   */
  card_number: string;
  /**
   * use one of these: `active`, `not_active`, `new_order`, `new`, `blocked`, `expired`, `renewed`, `replaced`, `order_in_process`, `unknown`. Defaults to `active`.
   */
  card_status?: PaymentCardCardStatus;
  /**
   * defines the appearance. Use one of these: `normal` or `compact`. Defaults to `normal`.
   */
  variant?: PaymentCardVariant;
  /**
   * will use 8 digits if none are specified.
   */
  digits?: PaymentCardDigits;
  /**
   * useful if you want to create custom cards. See Card data properties.
   */
  raw_data?: PaymentCardRawData;
  id?: string;
  /**
   * use `nb-NO` or `en-GB`. Defaults to the Eufemia provider.
   */
  locale?: InternalLocale;
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
  unknown
> {
  static defaultProps: Partial<PaymentCardProps>;
  render(): JSX.Element;
}
type CardDataReturn = Omit<PaymentCardRawData, 'cardDesign'> & {
  cardDesign: CardDesign;
};
export const getCardData = (product_code: string): CardDataReturn => null;
export const formatCardNumber = (
  cardNumber: string,
  digits?: number
): string => null;
