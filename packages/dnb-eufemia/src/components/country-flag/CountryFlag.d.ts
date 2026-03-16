import { SpaceAllProps } from '../space/Space';
type CountryFlagProps = {
    iso?: string;
    size?: 'auto' | 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
    shape?: 'round' | 'square';
} & Omit<SpaceAllProps, 'size'>;
declare const CountryFlag: (props: CountryFlagProps) => import("react/jsx-runtime").JSX.Element;
export default CountryFlag;
