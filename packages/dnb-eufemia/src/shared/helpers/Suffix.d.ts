/**
 * Suffix helper
 *
 */
import React from 'react';
import type { SkeletonShow } from '../../components/skeleton/Skeleton';
declare const SuffixContext: React.Context<any>;
export type SuffixChildren = React.ReactNode;
export type SuffixProps = {
    className: string;
    children: SuffixChildren;
    context: Record<string, unknown>;
    skeleton?: SkeletonShow;
};
declare const Suffix: ({ className, children, context, skeleton, ...props }: SuffixProps & React.HTMLAttributes<HTMLSpanElement>) => import("react/jsx-runtime").JSX.Element;
export { SuffixContext };
export default Suffix;
