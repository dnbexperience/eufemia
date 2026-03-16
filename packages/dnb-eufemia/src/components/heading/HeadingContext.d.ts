/**
 * Web Heading Context
 *
 */
import React from 'react';
import type { SkeletonContextProps } from '../skeleton/SkeletonHelper';
import type { HeadingProps } from './Heading';
export type HeadingContextProps = {
    heading?: HeadingProps;
} & SkeletonContextProps;
declare const HeadingContext: React.Context<HeadingContextProps>;
export default HeadingContext;
