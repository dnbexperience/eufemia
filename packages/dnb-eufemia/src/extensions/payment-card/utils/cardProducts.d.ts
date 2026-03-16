import type { CardDesign } from './CardDesigns';
import { CardType, ProductType, BankAxeptType } from './Types';
export interface CardProduct {
    productCode: string;
    productName: string;
    displayName: string;
    cardDesign: CardDesign;
    productType: ProductType;
    cardType: CardType;
    bankAxept: BankAxeptType;
}
declare const cardData: CardProduct[];
export default cardData;
