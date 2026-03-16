import { type IconIcon } from '../icon/Icon';
import type { ItemContentProps } from './ItemContent';
declare function ItemIcon({ children, className, ...rest }: Omit<ItemContentProps, 'children'> & {
    children: IconIcon;
}): import("react/jsx-runtime").JSX.Element;
export default ItemIcon;
