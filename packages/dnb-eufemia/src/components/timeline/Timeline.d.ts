import React from 'react';
import type { SpacingProps } from '../../shared/types';
import type { SkeletonShow } from '../skeleton/Skeleton';
import type { TimelineItemProps } from './TimelineItem';
import TimelineItem from './TimelineItem';
export type TimelineProps = {
    /**
     * Skeleton should be applied when loading content
     * Default: null
     */
    skeleton?: SkeletonShow;
    /**
     * Pass in a list of your events as objects of timelineitem, to render them as timelineitems.
     * Default: null
     */
    data?: TimelineItemProps[];
    /**
     * The content of the component. Can be used instead of prop "data".
     * Default: null
     */
    children?: React.ReactElement<TimelineItemProps>[] | React.ReactElement<TimelineItemProps>;
};
export type TimelineAllProps = TimelineProps & Omit<React.AllHTMLAttributes<HTMLOListElement>, 'type' | 'data'> & SpacingProps & {
    ref?: React.Ref<HTMLOListElement>;
};
declare const Timeline: {
    (localProps: TimelineAllProps): import("react/jsx-runtime").JSX.Element;
    Item: (localProps: import("./TimelineItem").TimelineItemAllProps) => import("react/jsx-runtime").JSX.Element;
};
export { TimelineItem };
export default Timeline;
