import type { ItemContentProps } from './ItemContent';
/**
 * Props for List.Cell.End (ItemEnd).
 * Extends ItemContentProps and Flex.Item; supports spacing props.
 */
export type ItemEndProps = {
    /** Font weight of the end content. Defaults to `medium`. */
    fontWeight?: 'regular' | 'medium';
    /** Font size of the end content. Defaults to `basis`. */
    fontSize?: 'small' | 'basis';
} & ItemContentProps;
declare function ItemEnd(props: ItemEndProps): import("react/jsx-runtime").JSX.Element;
export default ItemEnd;
