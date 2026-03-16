import type { ItemContentProps } from './ItemContent';
import ItemOverline from './ItemOverline';
import ItemSubline from './ItemSubline';
/**
 * Props for List.Cell.Title (ItemTitle).
 * Extends ItemContentProps and Flex.Item; supports spacing props.
 */
export type ItemTitleProps = ItemContentProps & {
    /** Font size of the title content. Defaults to `basis`. */
    fontSize?: 'small' | 'basis';
};
declare function ItemTitleBase({ className, fontSize, children, ...rest }: ItemTitleProps): import("react/jsx-runtime").JSX.Element;
type ItemTitleComponent = typeof ItemTitleBase & {
    Overline: typeof ItemOverline;
    Subline: typeof ItemSubline;
};
declare const ItemTitle: ItemTitleComponent;
export default ItemTitle;
