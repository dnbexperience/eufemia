import type { ItemContentProps } from './ItemContent';
export type ItemSublineVariant = 'description';
/**
 * Props for List.Cell.Title.Subline (ItemSubline).
 * Secondary line under the title; pairs with List.Cell.Title.Overline (above the row).
 */
export type ItemSublineProps = Omit<ItemContentProps, 'variant'> & {
    /** Visual variant. Use `description` for smaller, muted text. */
    variant?: ItemSublineVariant;
    /** Font size of the subline content. Defaults to `small`. When `variant="description"`, defaults to `x-small`. */
    fontSize?: 'basis' | 'small' | 'x-small';
    /** Font weight of the subline content. Defaults to `regular`. */
    fontWeight?: 'regular' | 'medium';
};
declare function ItemSubline({ className, variant, fontSize, fontWeight, children, ...rest }: ItemSublineProps): import("react/jsx-runtime").JSX.Element;
export default ItemSubline;
