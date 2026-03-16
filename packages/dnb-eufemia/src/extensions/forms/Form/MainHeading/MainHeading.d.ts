import React from 'react';
import type { HelpProps } from '../../../../components/help-button/HelpButtonInline';
import type { HeadingLevel } from '../../../../components/heading/Heading';
import type { ComponentProps } from '../../types';
export type Props = ComponentProps & {
    level?: HeadingLevel;
    help?: HelpProps;
    children?: React.ReactNode;
} & Omit<React.HTMLProps<HTMLElement>, 'size'>;
declare function MainHeading({ level, ...props }: Props): import("react/jsx-runtime").JSX.Element;
export default MainHeading;
