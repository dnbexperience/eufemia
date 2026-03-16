export interface DNB {
    '@@tag': 'Colored' | 'Sbanken';
    cata<R>(handlers: {
        Colored: (color: string) => R;
        Sbanken: (color: string) => R;
    }): R;
}
export interface Visa {
    '@@tag': 'Colored' | 'Platinum';
    cata<R>(handlers: {
        Colored: (color: string) => R;
        Platinum: () => R;
    }): R;
}
export interface Mastercard {
    '@@tag': 'Default' | 'Dark';
    cata<R>(handlers: {
        Default: () => R;
        Dark: () => R;
    }): R;
}
export interface CardType {
    '@@tag': 'Visa' | 'Mastercard' | 'None';
    cata<R>(handlers: {
        Visa: () => R;
        Mastercard: () => R;
        None: () => R;
    }): R;
}
export interface BankAxept {
    '@@tag': 'White' | 'Black' | 'Gold' | 'Black20' | 'Gray' | 'GrayDark';
    cata<R>(handlers: {
        White: () => R;
        Black: () => R;
        Gold: () => R;
        Black20: () => R;
        Gray: () => R;
        GrayDark: () => R;
    }): R;
}
export interface Saga {
    '@@tag': 'Gold' | 'Platinum' | 'None';
    cata<R>(handlers: {
        Gold: () => R;
        Platinum: () => R;
        None: () => R;
    }): R;
}
export interface PB {
    '@@tag': 'Default' | 'None';
    cata<R>(handlers: {
        Default: () => R;
        None: () => R;
    }): R;
}
export interface ProductType {
    '@@tag': 'Saga' | 'Pluss' | 'Intro' | 'Bedrift' | 'Business' | 'PrivateBanking' | 'Corporate' | 'WorldElite' | 'None';
    cata<R>(handlers: {
        Saga: () => R;
        Pluss: () => R;
        Intro: () => R;
        Bedrift: () => R;
        Business: () => R;
        PrivateBanking: () => R;
        Corporate: () => R;
        WorldElite: () => R;
        None: () => R;
    }): R;
}
export interface BankAxeptType {
    '@@tag': 'BankAxept' | 'Credit' | 'None';
    cata<R>(handlers: {
        BankAxept: () => R;
        Credit: () => R;
        None: () => R;
    }): R;
}
interface DNBConstructors {
    Colored: (color: string) => DNB;
    Sbanken: (color: string) => DNB;
    is: (val: unknown) => boolean;
    '@@type': string;
    '@@tags': string[];
}
interface VisaConstructors {
    Colored: (color: string) => Visa;
    Platinum: Visa;
    is: (val: unknown) => boolean;
    '@@type': string;
    '@@tags': string[];
}
interface MastercardConstructors {
    Default: Mastercard;
    Dark: Mastercard;
    is: (val: unknown) => boolean;
    '@@type': string;
    '@@tags': string[];
}
interface CardTypeConstructors {
    Visa: CardType;
    Mastercard: CardType;
    None: CardType;
    is: (val: unknown) => boolean;
    '@@type': string;
    '@@tags': string[];
}
interface BankAxeptConstructors {
    White: BankAxept;
    Black: BankAxept;
    Gold: BankAxept;
    Black20: BankAxept;
    Gray: BankAxept;
    GrayDark: BankAxept;
    is: (val: unknown) => boolean;
    '@@type': string;
    '@@tags': string[];
}
interface SagaConstructors {
    Gold: Saga;
    Platinum: Saga;
    None: Saga;
    is: (val: unknown) => boolean;
    '@@type': string;
    '@@tags': string[];
}
interface PBConstructors {
    Default: PB;
    None: PB;
    is: (val: unknown) => boolean;
    '@@type': string;
    '@@tags': string[];
}
interface ProductTypeConstructors {
    Saga: ProductType;
    Pluss: ProductType;
    Intro: ProductType;
    Bedrift: ProductType;
    Business: ProductType;
    PrivateBanking: ProductType;
    Corporate: ProductType;
    WorldElite: ProductType;
    None: ProductType;
    is: (val: unknown) => boolean;
    '@@type': string;
    '@@tags': string[];
}
interface BankAxeptTypeConstructors {
    BankAxept: BankAxeptType;
    Credit: BankAxeptType;
    None: BankAxeptType;
    is: (val: unknown) => boolean;
    '@@type': string;
    '@@tags': string[];
}
export declare const DNB: DNBConstructors;
export declare const Visa: VisaConstructors;
export declare const Mastercard: MastercardConstructors;
export declare const CardType: CardTypeConstructors;
export declare const BankAxept: BankAxeptConstructors;
export declare const Saga: SagaConstructors;
export declare const PB: PBConstructors;
export declare const ProductType: ProductTypeConstructors;
export declare const BankAxeptType: BankAxeptTypeConstructors;
declare const Types: {
    DNB: DNBConstructors;
    Saga: SagaConstructors;
    PB: PBConstructors;
    Mastercard: MastercardConstructors;
    ProductType: ProductTypeConstructors;
    CardType: CardTypeConstructors;
    BankAxept: BankAxeptConstructors;
    BankAxeptType: BankAxeptTypeConstructors;
    Visa: VisaConstructors;
};
export default Types;
