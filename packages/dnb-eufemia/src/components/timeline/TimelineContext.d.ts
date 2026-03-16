import React from 'react';
import type { SkeletonShow } from '../skeleton/Skeleton';
export type TimelineContextValue = {
    skeleton?: SkeletonShow;
};
declare const TimelineContext: React.Context<TimelineContextValue>;
export default TimelineContext;
