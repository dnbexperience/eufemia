import { SpaceAllProps } from '../space/Space';
export type Columns = number;
export type Span = [Columns, Columns | 'end'] | 'full';
export type Media = {
    small?: Span;
    medium?: Span;
    large?: Span;
};
export type BasicProps = {
    span?: Media | Span;
};
export type AllProps = BasicProps & Omit<SpaceAllProps, 'span'>;
declare function GridItem(props: AllProps): import("react/jsx-runtime").JSX.Element;
export default GridItem;
