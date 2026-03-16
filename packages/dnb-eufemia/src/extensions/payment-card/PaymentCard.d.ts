/**
 * Web PaymentCard Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react';
import { formatCardNumber } from './components/CardNumber';
import { ProductType, CardType, BankAxeptType } from './utils/Types';
import Designs from './utils/CardDesigns';
import type { CardDesign } from './utils/CardDesigns';
import type { SpacingProps } from '../../shared/types';
import type { SkeletonShow } from '../../components/skeleton/Skeleton';
import type { InternalLocale } from '../../shared/Context';
export { Designs, ProductType, CardType, BankAxeptType };
export { formatCardNumber };
export type PaymentCardCardStatus = 'active' | 'blocked' | 'expired' | 'notActive' | 'newOrder' | 'new' | 'orderInProcess' | 'renewed' | 'replaced' | 'unknown';
export type PaymentCardVariant = 'normal' | 'compact';
export type PaymentCardDigits = string | number;
export type PaymentCardChildren = string | React.ReactNode | ((...args: any[]) => any);
export interface PaymentCardRawData {
    productCode: string;
    productName: string;
    displayName: string;
    cardDesign: CardDesign;
    cardType: CardType;
    productType: ProductType;
    bankAxept: BankAxeptType;
}
export interface PaymentCardProps extends Omit<React.HTMLProps<HTMLElement>, 'ref' | 'children'>, SpacingProps {
    /**
     * If product code matches one of the codes in the list the card will get that design, if no match is found Default design will be used.
     */
    productCode: string;
    /**
     * Masked card number.
     */
    cardNumber: string;
    /**
     * Use one of these: `active`, `notActive`, `newOrder`, `new`, `blocked`, `expired`, `renewed`, `replaced`, `orderInProcess`, `unknown`. Defaults to `active`.
     */
    cardStatus?: PaymentCardCardStatus;
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
    rawData?: PaymentCardRawData;
    id?: string;
    /**
     * Use `nb-NO` or `en-GB`. Defaults to the Eufemia provider.
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
declare function PaymentCard(props: PaymentCardProps): import("react/jsx-runtime").JSX.Element;
export default PaymentCard;
export declare const getCardData: (productCode: any) => {
    productCode: any;
    productName: string;
    displayName: string;
    cardDesign: CardDesign;
    cardType: CardType;
    productType: ProductType;
    bankAxept: BankAxeptType;
};
