/**
 * Web Space Component
 *
 */
import React from 'react';
import type { DynamicElement, SpacingProps } from '../../shared/types';
import type { SkeletonShow } from '../Skeleton';
import type { InnerSpaceType } from './types';
export type SpaceProps = {
    /**
     * Defines the HTML element used.
     * Default: div
     */
    element?: DynamicElement;
    /**
     * If set to `true`, then `display: inline-block;` is used, so the HTML elements get aligned horizontally. Defaults to `false`.
     * Default: false
     */
    inline?: boolean;
    /**
     * If set to `true`, then a wrapper with `display: flow-root;` is used. This way you avoid **Margin Collapsing**. Defaults to `false`. _Note:_ You can't use `inline={true}` in combination.
     * Default: false
     */
    noCollapse?: boolean;
    /**
     * If set to `true`, then the space element will be 100% in width.
     * Default: false
     */
    stretch?: boolean;
    /**
     * If set to `true`, a loading skeleton will be shown.
     * Default: false
     */
    skeleton?: SkeletonShow;
    /**
     * Send along a custom React Ref.
     * Default: null
     */
    ref?: React.Ref<HTMLElement>;
} & Omit<SpacingProps, 'innerSpace'> & {
    innerSpace?: InnerSpaceType;
};
export type SpaceAllProps = SpaceProps & Omit<React.HTMLProps<HTMLElement>, 'ref'>;
declare function Space(props: SpaceAllProps): import("react/jsx-runtime").JSX.Element;
export default Space;
