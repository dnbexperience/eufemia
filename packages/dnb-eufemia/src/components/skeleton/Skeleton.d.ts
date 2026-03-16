/**
 * Web Skeleton Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react';
import type { SpacingProps } from '../space/types';
export type SkeletonShow = boolean;
export type SkeletonFigure = string | ((...args: any[]) => any) | React.ReactNode;
export type SkeletonChildren = string | ((...args: any[]) => any) | React.ReactNode;
export interface SkeletonProps extends Omit<React.HTMLProps<HTMLElement>, 'ref' | 'children'>, SpacingProps {
    /**
     * Use `true` to enable/show the skeleton for the component used inside. Defaults to `false`.
     */
    show?: boolean;
    /**
     * Use `true` to disable the animation.
     */
    noAnimation?: boolean;
    /**
     * Define a figure to use, like `article`. The wrapped content will be hidden while the skeleton figure is shown.
     */
    figure?: SkeletonFigure;
    /**
     * Is used for screen reader text translation, defined in the translation files. You can set a custom text if needed.
     */
    ariaBusy?: string;
    /**
     * Is used for screen reader text translation, defined in the translation files. You can set a custom text if needed.
     */
    ariaReady?: string;
    /**
     * Set any HTML element type you have to use. A couple of aria attributes will be set on this element while active. Defaults to `div`.
     */
    element?: React.ReactNode;
    /**
     * If set to `true`, a loading skeleton will be shown.
     */
    skeleton?: boolean;
    className?: string;
    children?: SkeletonChildren;
}
declare function Skeleton(props: SkeletonProps): import("react/jsx-runtime").JSX.Element;
declare namespace Skeleton {
    var Exclude: (props: any) => import("react/jsx-runtime").JSX.Element;
}
export default Skeleton;
