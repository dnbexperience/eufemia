export interface Translations {
    textBlocked: string;
    textExpired: string;
    textNotActive: string;
    textNewOrder: string;
    textOrderInProcess: string;
    textReplaced: string;
    textRenewed: string;
    textNew: string;
    textUnknown: string;
}
interface StatusOverlayProps {
    cardStatus: string;
    translations: Translations;
    cardDesign: string;
}
declare const StatusOverlay: ({ cardStatus, translations, cardDesign, }: StatusOverlayProps) => import("react/jsx-runtime").JSX.Element;
export declare const isCardBlocked: (cardStatus: string) => boolean;
export default StatusOverlay;
