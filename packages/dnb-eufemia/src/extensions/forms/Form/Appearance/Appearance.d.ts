import React from 'react';
export type Props = {
    size?: 'medium' | 'large';
    children: React.ReactNode;
};
declare function FormAppearance({ children, size, ...rest }: Props): import("react/jsx-runtime").JSX.Element;
export default FormAppearance;
