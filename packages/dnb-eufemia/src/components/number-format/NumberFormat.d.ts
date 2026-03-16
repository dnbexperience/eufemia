/**
 * Web NumberFormat Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react';
import { type ContextProps } from '../../shared/Context';
import type { SpacingProps } from '../space/types';
export type NumberFormatValue = number | string;
export type NumberFormatPrefix = React.ReactNode | ((...args: any[]) => any);
export type NumberFormatSuffix = React.ReactNode | ((...args: any[]) => any);
export type NumberFormatCurrency = string | boolean;
export type NumberFormatCurrencyPosition = 'auto' | 'before' | 'after';
export type NumberFormatCompact = 'short' | 'long' | boolean;
export type NumberFormatLink = 'tel' | 'sms';
export type NumberFormatSignDisplay = 'auto' | 'always' | 'exceptZero' | 'negative' | 'never';
export type NumberFormatOptions = Record<string, unknown> | string;
export type NumberFormatDecimals = number | string;
export type NumberFormatElement = string;
export type NumberFormatTooltip = string | ((...args: any[]) => any) | React.ReactNode;
export type NumberFormatChildren = React.ReactNode | ((...args: any[]) => any);
export type NumberFormatProps = {
    id?: string;
    value?: NumberFormatValue;
    locale?: string;
    prefix?: NumberFormatPrefix;
    suffix?: NumberFormatSuffix;
    currency?: NumberFormatCurrency;
    currencyDisplay?: 'code' | 'name' | 'symbol' | 'narrowSymbol' | '' | false;
    currencyPosition?: NumberFormatCurrencyPosition;
    compact?: NumberFormatCompact;
    ban?: boolean;
    nin?: boolean;
    phone?: boolean;
    org?: boolean;
    percent?: boolean;
    link?: NumberFormatLink;
    monospace?: boolean;
    options?: NumberFormatOptions;
    decimals?: NumberFormatDecimals;
    selectAll?: boolean;
    alwaysSelectAll?: boolean;
    copySelection?: boolean;
    cleanCopyValue?: boolean;
    rounding?: 'omit' | 'half-even' | 'half-up';
    signDisplay?: NumberFormatSignDisplay;
    clean?: boolean;
    srLabel?: React.ReactNode;
    element?: NumberFormatElement;
    tooltip?: NumberFormatTooltip;
    skeleton?: string | boolean;
    className?: string;
    children?: NumberFormatChildren;
    style?: React.CSSProperties;
    lang?: string;
};
export type NumberFormatAllProps = NumberFormatProps & Omit<React.HTMLProps<HTMLElement>, 'prefix' | 'label' | 'placeholder' | 'children'> & SpacingProps;
export declare const COPY_TOOLTIP_TIMEOUT = 3000;
interface NumberFormatState {
    selected: boolean;
    omitCurrencySign: boolean;
    hover: boolean;
    copyTooltipActive: boolean;
    copyTooltipText: string | null;
}
export default class NumberFormat extends React.PureComponent<NumberFormatAllProps, NumberFormatState> {
    static contextType: React.Context<ContextProps>;
    context: ContextProps;
    static defaultProps: {
        id: any;
        value: any;
        locale: any;
        prefix: any;
        suffix: any;
        currency: any;
        currencyDisplay: any;
        currencyPosition: any;
        compact: any;
        ban: any;
        nin: any;
        phone: any;
        org: any;
        percent: any;
        link: any;
        monospace: boolean;
        options: any;
        decimals: any;
        selectAll: boolean;
        alwaysSelectAll: boolean;
        copySelection: boolean;
        cleanCopyValue: boolean;
        rounding: any;
        clean: any;
        srLabel: any;
        element: string;
        tooltip: any;
        skeleton: any;
        className: any;
        children: any;
    };
    _ref: React.RefObject<HTMLElement>;
    _selectionRef: React.RefObject<HTMLElement>;
    _id: string | undefined;
    _copyTooltipTimeout: ReturnType<typeof setTimeout> | null;
    outsideClick: {
        remove: () => void;
    } | null;
    cleanedValue: string | undefined;
    constructor(props: NumberFormatAllProps);
    componentDidMount(): void;
    clearCopyTooltipTimeout: () => void;
    showCopyTooltip: (message?: string) => void;
    shortcutHandler: () => void;
    onBlurHandler: () => void;
    onContextMenuHandler: () => void;
    onClickHandler: () => void;
    componentWillUnmount(): void;
    setFocus(): void;
    selectAll(): void;
    runFix(comp: unknown, className: string): React.ReactNode;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
