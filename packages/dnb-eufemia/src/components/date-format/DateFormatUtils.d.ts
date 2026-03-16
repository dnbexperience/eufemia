import type { AnyLocale } from '../../shared/Context';
import type { DateType } from '../date-picker/DatePickerContext';
export type FormatDateOptions = {
    locale?: AnyLocale;
    options?: Intl.DateTimeFormatOptions;
    timeZone?: string;
    /** When true, hides the year if the date is in the current year (any dateStyle). */
    hideCurrentYear?: boolean;
    /** When true, always hides the year from the formatted date (any dateStyle). */
    hideYear?: boolean;
};
type FormatDateInput = DateType | number | string;
/**
 * Gets the locale-appropriate separator between date and time parts
 * by using Intl.DateTimeFormat.formatToParts()
 */
export declare function getDateTimeSeparator(locale: AnyLocale, dateStyle: Intl.DateTimeFormatOptions['dateStyle'], timeStyle: Intl.DateTimeFormatOptions['timeStyle']): string;
export declare function formatDate(dateValue: FormatDateInput, { locale, options, timeZone, hideCurrentYear, hideYear, }?: FormatDateOptions): string;
export declare function formatDateRange(dates: {
    startDate: DateType;
    endDate: DateType;
}, { locale, options, }?: FormatDateOptions): string;
declare const timeUnitsInMs: {
    readonly seconds: 1000;
    readonly minutes: 60000;
    readonly hours: 3600000;
    readonly days: 86400000;
    readonly weeks: 604800000;
    readonly months: number;
    readonly years: number;
};
export type RelativeTimeUnit = keyof typeof timeUnitsInMs;
/**
 * Returns a relative time string, e.g. "3 days ago"
 *
 * Note: The dateStyle prop maps to Intl.RelativeTimeFormat styles in an intuitive way:
 * - short -> narrow (most abbreviated, e.g., "2t, 30m")
 * - medium -> short (medium abbreviation, e.g., "2 t, 30 min")
 * - long -> long (full words, e.g., "2 hours, 30 minutes")
 */
export declare function getRelativeTime(date: Date, locale?: AnyLocale, options?: Intl.RelativeTimeFormatOptions, dateStyle?: Intl.DateTimeFormatOptions['dateStyle'], relativeTimeReference?: Date | (() => Date)): string;
/**
 * Calculates the optimal delay in milliseconds until the relative time label
 * is expected to change next. Uses the same unit logic as getRelativeTime,
 * and schedules the update at the next rounding threshold to minimize re-renders.
 */
export declare function getRelativeTimeNextUpdateMs(date: Date, relativeTimeReference?: Date | (() => Date)): number;
/**
 * Parses an ISO 8601 duration string (e.g., "PT2H30M", "P1DT2H30M")
 * and returns the duration in milliseconds
 */
export declare function parseDuration(durationString: string): number;
/**
 * Formats a duration in milliseconds to a human-readable string
 * based on the locale and options
 */
export declare function formatDuration(durationMs: number, locale?: AnyLocale, dateStyle?: Intl.DateTimeFormatOptions['dateStyle'], originalDurationString?: string): string;
/**
 * Checks if a string is a valid ISO 8601 duration
 */
export declare function isValidDuration(durationString: string): boolean;
export declare function getOsloDate(date?: Date): Date;
export {};
