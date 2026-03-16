import React from 'react';
import type { IconIcon } from '../icon/Icon';
import type { SkeletonShow } from '../skeleton/Skeleton';
export type TimeLineItemStates = 'completed' | 'current' | 'upcoming';
export type TimelineItemProps = {
    /**
     * Icon displaying on the left side.
     * Default: `check` for state `completed`, `pin` for state `current`, and `calendar` for state `upcoming` .
     */
    icon?: IconIcon;
    /**
     * Text displaying the title of the item's corresponding page.
     * Default: translations based on the icon.
     */
    iconAlt?: string;
    /**
     * Text displaying the title of the timeline item.
     */
    title: React.ReactNode;
    /**
     * Text displaying the subtitle of the timeline item.
     */
    subtitle?: React.ReactNode | React.ReactNode[];
    /**
     * Text displaying info message of the timeline item.
     */
    infoMessage?: React.ReactNode;
    /**
     * The component state. State 'completed', 'current' or 'upcoming'.
     * Default: null
     */
    state: TimeLineItemStates;
    /**
     * Skeleton should be applied when loading content
     * Default: null
     */
    skeleton?: SkeletonShow;
};
export type TimelineItemAllProps = TimelineItemProps & Omit<React.AllHTMLAttributes<HTMLLIElement>, 'title' | 'name'>;
declare const TimelineItem: (localProps: TimelineItemAllProps) => import("react/jsx-runtime").JSX.Element;
export default TimelineItem;
