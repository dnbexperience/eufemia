/**
 * Web Heading Counter
 *
 */
import type { HeadingAllProps, InternalHeadingLevel, HeadingLevelSizeResolutions } from './Heading';
import type { ThemeNames } from '../../shared';
import type { DynamicElement } from '../../shared/types';
import type { HeadingCounter } from './HeadingCounter';
type GlobalSyncCounter = {
    current: HeadingCounter;
};
type GlobalHeadingCounter = {
    current: HeadingCounter;
};
export declare const globalSyncCounter: GlobalSyncCounter;
export declare const globalHeadingCounter: GlobalHeadingCounter;
type CorrectInternalHeadingLevel = {
    counter: HeadingCounter;
    level: InternalHeadingLevel;
    ref?: HeadingAllProps;
    reset?: HeadingAllProps['reset'];
    inherit?: boolean;
    increase?: boolean;
    decrease?: boolean;
    source?: HeadingAllProps['children'];
    bypassChecks?: boolean;
    isRerender?: boolean;
    debug?: HeadingAllProps['debug'];
};
export declare const correctInternalHeadingLevel: ({ counter, level, ref, reset, inherit, increase, decrease, source, bypassChecks, isRerender, debug, }: CorrectInternalHeadingLevel) => import("./HeadingCounter").Counter;
export declare function resetAllLevels(): void;
export declare const globalResetNextTime: {
    current: GlobalNextLevel;
};
export declare function resetLevels(level: InternalHeadingLevel, { overwriteContext }?: {
    overwriteContext?: boolean;
}): void;
type GlobalNextLevel = {
    level: InternalHeadingLevel;
    overwriteContext: boolean;
};
export declare const globalNextLevel: {
    current: GlobalNextLevel;
};
export declare function setNextLevel(level: InternalHeadingLevel, { overwriteContext }?: {
    overwriteContext?: boolean;
}): void;
export declare function windupHeadings(): void;
export declare function teardownHeadings(): void;
export declare function debugCounter(counter: any): string;
export declare const getHeadingSize: (theme: ThemeNames) => HeadingLevelSizeResolutions;
export declare const getHeadingElement: (level: InternalHeadingLevel) => DynamicElement;
export {};
