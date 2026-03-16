import type { ItemContentProps } from './ItemContent';
/**
 * Props for List.Cell.Start (ItemStart).
 * Extends ItemContentProps and Flex.Item; supports spacing props.
 */
export type ItemStartProps = ItemContentProps & {
    /** Font size of the start content. Defaults to `basis`. */
    fontSize?: 'small' | 'basis';
};
declare function ItemStart({ className, fontSize, ...rest }: ItemStartProps): import("react/jsx-runtime").JSX.Element;
export default ItemStart;
