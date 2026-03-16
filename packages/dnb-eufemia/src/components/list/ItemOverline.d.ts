import type { ItemContentProps } from './ItemContent';
/**
 * Props for List.Cell.Title.Overline (ItemOverline).
 * Secondary line above the main row; pairs with List.Cell.Title.Subline (below title).
 */
export type ItemOverlineProps = ItemContentProps & {
    /** Font size of the overline content. Defaults to `x-small`. */
    fontSize?: 'basis' | 'small' | 'x-small';
    /** Font weight of the overline content. Defaults to `medium`. */
    fontWeight?: 'regular' | 'medium';
};
declare function ItemOverline({ className, fontSize, fontWeight, children, ...rest }: ItemOverlineProps): import("react/jsx-runtime").JSX.Element;
export default ItemOverline;
