import type { Props as FlexContainerProps } from './Container';
export type Props = Omit<FlexContainerProps, 'direction'>;
declare function Vertical({ children, ...props }: Props): import("react/jsx-runtime").JSX.Element;
export default Vertical;
