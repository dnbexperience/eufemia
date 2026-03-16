/**
 * Web Heading Counter Instance
 *
 */
import type { HeadingAllProps, InternalHeadingLevel } from './Heading';
export type HeadingCounter = Counter;
export type HeadingDebugCounter = boolean | (() => void);
export type ContextCounter = {
    level: InternalHeadingLevel;
    entry: InternalHeadingLevel;
    countHeadings: number;
    _initCount: number;
    _isReady: boolean;
    isGlobal?: boolean;
};
export declare const initCounter: (props?: CounterProps) => Counter;
export type CounterGroup = HeadingAllProps['group'];
export type CounterChildren = HeadingAllProps['children'];
export type CounterProps = {
    isGlobal?: boolean;
    group?: CounterGroup;
    children?: CounterChildren;
    counter?: CounterProps;
};
export declare class Counter {
    level: InternalHeadingLevel;
    entry: InternalHeadingLevel;
    lastResetLevel: InternalHeadingLevel;
    _isReady: boolean;
    countHeadings: number;
    _initCount: number;
    isGlobal: boolean;
    isHeading: boolean;
    bypassChecks: boolean;
    contextCounter: ContextCounter;
    reports: any[];
    group: CounterGroup;
    children: CounterChildren;
    constructor(props?: CounterProps);
    report(...str: any[]): void;
    useLastReport(): any;
    enableBypassChecks(): void;
    disableBypassChecks(): void;
    getLevel(): number;
    hasEntryLevel(): boolean;
    hasCorrection(): boolean;
    setEntryLevel(level?: InternalHeadingLevel): void;
    isInContext(): boolean;
    setContextCounter(contextCounter: ContextCounter): void;
    windup(): void;
    teardown(): void;
    makeMeReady({ level }?: {
        level?: InternalHeadingLevel;
    }): void;
    factorCheck({ action, level, current, report }: {
        action: any;
        level: any;
        current: any;
        report: any;
    }): any;
    setLevel(level: InternalHeadingLevel, action?: string): void;
    increment(): void;
    decrement(): void;
    force(level?: number): void;
    reset(toLevel?: any): void;
}
