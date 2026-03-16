import React from 'react';
import type { InternalLocale } from '../../shared/Context';
import type { SpacingProps } from '../space/types';
import type { SkeletonShow } from '../Skeleton';
type DateFormatProps = SpacingProps & {
    value?: Date | string | number;
    children?: React.ReactNode;
    locale?: InternalLocale;
    dateStyle?: Intl.DateTimeFormatOptions['dateStyle'];
    timeStyle?: Intl.DateTimeFormatOptions['timeStyle'];
    dateTimeSeparator?: string;
    /** When `true`, hides the year if the date is in the current year (any `dateStyle`). */
    hideCurrentYear?: boolean;
    /** When `true`, always hides the year from the formatted date (any `dateStyle`). */
    hideYear?: boolean;
    relativeTimeStyle?: Intl.DateTimeFormatOptions['dateStyle'];
    relativeTime?: boolean;
    relativeTimeReference?: () => Date;
    skeleton?: SkeletonShow;
    className?: string;
    id?: string;
    title?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
};
declare function DateFormat(props: DateFormatProps): import("react/jsx-runtime").JSX.Element;
export default DateFormat;
