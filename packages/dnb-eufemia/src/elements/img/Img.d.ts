/**
 * HTML Element
 *
 */
import React from 'react';
import type { SpacingProps } from '../../components/space/types';
import type { SkeletonShow } from '../../components/skeleton/Skeleton';
import type { DynamicElement } from '../../shared/types';
export type ImgProps = SpacingProps & React.HTMLProps<HTMLImageElement> & {
    src: string;
    alt: string;
    skeleton?: SkeletonShow;
    imgClass?: string;
    element?: DynamicElement & 'figure';
    caption?: string;
    loading?: 'eager' | 'lazy';
};
declare const Img: ({ caption, alt, element, skeleton, imgClass, className, loading, ...p }: ImgProps) => import("react/jsx-runtime").JSX.Element;
export default Img;
