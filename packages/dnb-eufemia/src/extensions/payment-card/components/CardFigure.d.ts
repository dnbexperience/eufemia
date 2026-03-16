import type { Translations } from './StatusOverlay';
import { BankAxeptType, CardType } from '../utils/Types';
export type CardData = {
    productCode: string;
    productName: string;
    displayName: string;
    cardDesign: {
        cardStyle: string;
        bankLogo: string;
        backgroundImage?: string;
    };
    cardType: CardType;
    productType: any;
    bankAxept: BankAxeptType;
};
type CardFigureProps = {
    id?: string | null;
    skeleton?: boolean;
    compact?: boolean;
    data: CardData;
    cardStatus: string;
    cardNumber: string;
    translations: Translations;
};
declare function CardFigure({ data, cardStatus, cardNumber, id, skeleton, compact, translations, }: CardFigureProps): import("react/jsx-runtime").JSX.Element;
export default CardFigure;
