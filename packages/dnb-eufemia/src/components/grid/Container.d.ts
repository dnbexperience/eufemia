import { SpaceAllProps } from '../space/Space';
export type Columns = number;
export type Media = {
    small?: Columns | false;
    medium?: Columns | false;
    large?: Columns | false;
};
export type BasicProps = {
    columns?: Media | Columns;
    rowGap?: 'x-small' | 'small' | 'medium' | 'large' | boolean;
    columnGap?: 'x-small' | 'small' | 'medium' | 'large' | boolean;
};
export type AllProps = BasicProps & SpaceAllProps;
declare function GridContainer(props: AllProps): import("react/jsx-runtime").JSX.Element;
export default GridContainer;
