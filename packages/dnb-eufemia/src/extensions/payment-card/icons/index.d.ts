import { StatusIcon } from './status';
type DaggyType = any;
type DaggyDesign = Record<string, any>;
declare const BankLogo: ({ logoType }: {
    logoType: DaggyType;
}) => any;
declare const ProductLogo: ({ productType, cardDesign, }: {
    productType: DaggyType;
    cardDesign: DaggyDesign;
}) => any;
declare const BankAxeptLogo: ({ bankAxept, cardDesign, }: {
    bankAxept: DaggyType;
    cardDesign: DaggyDesign;
}) => any;
declare const TypeLogo: ({ cardType, cardDesign, }: {
    cardType: DaggyType;
    cardDesign: DaggyDesign;
}) => any;
export { BankLogo, ProductLogo, StatusIcon, TypeLogo, BankAxeptLogo };
